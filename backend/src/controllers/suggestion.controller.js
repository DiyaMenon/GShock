const Suggestion = require('../models/suggestion.model');
const SearchHistory = require('../models/searchHistory.model');
const Order = require('../models/order.model');
const Product = require('../models/product.model');

// Helper: Ensure suggestion config exists
async function ensureSuggestionsExist() {
  let suggestions = await Suggestion.findOne({});
  if (!suggestions) {
    suggestions = await Suggestion.create({
      defaultSuggestions: [],
      userSuggestions: [],
      enableAutoSuggestions: true,
      autoSuggestionType: 'hybrid',
    });
  }
  return suggestions;
}

// Helper: Get default products efficiently (With Fallback)
async function getDefaultProducts(suggestions) {
  let products = [];
  
  // 1. Try to get Admin-defined defaults
  if (suggestions.defaultSuggestions && suggestions.defaultSuggestions.length > 0) {
    const defaultIds = suggestions.defaultSuggestions
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((s) => s.productId);

    const foundProducts = await Product.find({ _id: { $in: defaultIds } });
    
    // Map back to preserve order and filter nulls
    products = defaultIds
      .map(id => foundProducts.find(p => p._id.toString() === id.toString()))
      .filter(p => p != null);
  }

  // 2. FALLBACK: If admin hasn't set defaults (or they were deleted), fetch any 3 products
  if (products.length < 3) {
    const randomProducts = await Product.find({ _id: { $nin: products.map(p => p._id) } }).limit(3 - products.length);
    products = [...products, ...randomProducts];
  }

  return products;
}

// Main: Get suggestions for User/Guest
async function getSuggestions(req, res) {
  try {
    const userId = req.user?._id;
    const suggestions = await ensureSuggestionsExist();

    let suggestedProducts = [];

    // 1. Guest User: Return Defaults
    if (!userId) {
      suggestedProducts = await getDefaultProducts(suggestions);
      return res.status(200).json({ suggestions: suggestedProducts.slice(0, 3), isPersonalized: false });
    }

    // 2. Authenticated User Logic
    const userSuggestionsEntry = suggestions.userSuggestions.find(
      (us) => us.userId.toString() === userId.toString()
    );

    // A. Manual Override exists OR Auto is disabled
    if (userSuggestionsEntry || !suggestions.enableAutoSuggestions) {
      if (userSuggestionsEntry && userSuggestionsEntry.productIds.length > 0) {
        suggestedProducts = await Product.find({
          _id: { $in: userSuggestionsEntry.productIds },
        });
      } else {
        suggestedProducts = await getDefaultProducts(suggestions);
      }
    } 
    // B. Auto Suggestions
    else {
      switch (suggestions.autoSuggestionType) {
        case 'orderHistory':
          suggestedProducts = await getOrderBasedSuggestions(userId);
          break;
        case 'searchHistory':
          suggestedProducts = await getSearchBasedSuggestions(userId);
          break;
        case 'related':
          suggestedProducts = await getRelatedProductSuggestions(userId);
          break;
        case 'hybrid':
          suggestedProducts = await getHybridSuggestions(userId);
          break;
        default:
          suggestedProducts = await getHybridSuggestions(userId);
      }

      // Fill with defaults if not enough suggestions
      if (suggestedProducts.length < 3) {
        const defaults = await getDefaultProducts(suggestions);
        
        // Add defaults that aren't already in the list
        for (const defProduct of defaults) {
          if (suggestedProducts.length >= 3) break;
          const alreadyExists = suggestedProducts.some(p => p._id.toString() === defProduct._id.toString());
          if (!alreadyExists) {
            suggestedProducts.push(defProduct);
          }
        }
      }
    }

    // Filter out any potential nulls one last time and limit to 3
    const finalSuggestions = suggestedProducts.filter(p => p != null).slice(0, 3);

    res.status(200).json({ 
      suggestions: finalSuggestions,
      isPersonalized: true 
    });
  } catch (error) {
    console.error('Error getting suggestions:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Strategy 1: Order History
async function getOrderBasedSuggestions(userId) {
  try {
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('items.itemId', 'category tags');

    const orderedProductIds = new Set();
    const categories = new Set();
    const tags = new Set();

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.itemType === 'menu' && item.itemId) {
          orderedProductIds.add(item.itemId._id.toString());
          if (item.itemId.category) categories.add(item.itemId.category);
          if (item.itemId.tags) item.itemId.tags.forEach(t => tags.add(t));
        }
      });
    });

    if (orderedProductIds.size === 0) return [];

    return await Product.find({
      _id: { $nin: Array.from(orderedProductIds) },
      $or: [
        { category: { $in: Array.from(categories) } }, 
        { tags: { $in: Array.from(tags) } }
      ],
    }).limit(3);
  } catch (error) {
    console.error('Error in getOrderBasedSuggestions:', error);
    return [];
  }
}

// Strategy 2: Search History
async function getSearchBasedSuggestions(userId) {
  try {
    const searchHistory = await SearchHistory.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    if (!searchHistory.length) return [];

    const searchedTags = [...new Set(searchHistory.flatMap((sh) => sh.tags || []))];
    const searchQueries = [...new Set(searchHistory.map((sh) => sh.searchQuery).filter(Boolean))];

    if (searchedTags.length === 0 && searchQueries.length === 0) return [];

    const queryConditions = [];
    if (searchedTags.length) queryConditions.push({ tags: { $in: searchedTags } });
    if (searchQueries.length) {
      const regex = searchQueries.join('|');
      queryConditions.push({ name: { $regex: regex, $options: 'i' } });
      queryConditions.push({ description: { $regex: regex, $options: 'i' } });
    }

    return await Product.find({ $or: queryConditions }).limit(3);
  } catch (error) {
    console.error('Error in getSearchBasedSuggestions:', error);
    return [];
  }
}

// Strategy 3: Related Products
async function getRelatedProductSuggestions(userId) {
  try {
    const lastOrder = await Order.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .populate('items.itemId', 'category');

    if (!lastOrder) return [];

    const lastProductIds = new Set();
    const categories = new Set();

    lastOrder.items.forEach((item) => {
      if (item.itemType === 'menu' && item.itemId) {
        lastProductIds.add(item.itemId._id.toString());
        categories.add(item.itemId.category);
      }
    });

    return await Product.find({
      _id: { $nin: Array.from(lastProductIds) },
      category: { $in: Array.from(categories) },
    }).limit(3);
  } catch (error) {
    console.error('Error in getRelatedProductSuggestions:', error);
    return [];
  }
}

// Strategy 4: Hybrid
async function getHybridSuggestions(userId) {
  try {
    const [orderBased, searchBased, related] = await Promise.all([
      getOrderBasedSuggestions(userId),
      getSearchBasedSuggestions(userId),
      getRelatedProductSuggestions(userId)
    ]);

    const uniqueMap = new Map();
    const addProduct = (p) => {
      if (p && p._id && !uniqueMap.has(p._id.toString())) {
        uniqueMap.set(p._id.toString(), p);
      }
    };

    orderBased.forEach(addProduct);
    searchBased.forEach(addProduct);
    related.forEach(addProduct);

    return Array.from(uniqueMap.values()).slice(0, 3);
  } catch (error) {
    console.error('Error in getHybridSuggestions:', error);
    return [];
  }
}

// Admin: Get default suggestions
async function getDefaultSuggestions(req, res) {
  try {
    const suggestions = await ensureSuggestionsExist();
    const sortedProducts = await getDefaultProducts(suggestions);

    res.status(200).json({
      suggestions: sortedProducts,
      settings: {
        enableAutoSuggestions: suggestions.enableAutoSuggestions,
        autoSuggestionType: suggestions.autoSuggestionType,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Admin: Update default suggestions
async function updateDefaultSuggestions(req, res) {
  try {
    const { productIds } = req.body;
    if (!Array.isArray(productIds) || productIds.length < 3) {
      return res.status(400).json({ message: 'Exactly 3 products must be selected' });
    }

    const suggestions = await ensureSuggestionsExist();
    suggestions.defaultSuggestions = productIds.map((id, index) => ({
      productId: id,
      displayOrder: index,
    }));
    await suggestions.save();
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Admin: Get all user suggestions
async function getAllUserSuggestions(req, res) {
  try {
    const suggestions = await ensureSuggestionsExist();
    const userSuggestions = [];
    
    for (const us of suggestions.userSuggestions) {
      const products = await Product.find({ _id: { $in: us.productIds } });
      if (products.length > 0) {
        userSuggestions.push({
          userId: us.userId,
          products,
          type: us.type,
          createdAt: us.createdAt,
        });
      }
    }

    res.status(200).json(userSuggestions);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Admin: Set suggestions for a specific user
async function setUserSuggestions(req, res) {
  try {
    const { userId, productIds, type = 'manual' } = req.body;

    if (!Array.isArray(productIds) || productIds.length < 3) {
      return res.status(400).json({ message: 'Exactly 3 products must be selected' });
    }

    const suggestions = await ensureSuggestionsExist();
    suggestions.userSuggestions = suggestions.userSuggestions.filter(
      (us) => us.userId.toString() !== userId
    );
    suggestions.userSuggestions.push({
      userId,
      productIds,
      type,
      createdAt: new Date(),
    });

    await suggestions.save();
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Admin: Remove user suggestions
async function removeUserSuggestions(req, res) {
  try {
    const { userId } = req.params;
    const suggestions = await ensureSuggestionsExist();
    suggestions.userSuggestions = suggestions.userSuggestions.filter(
      (us) => us.userId.toString() !== userId
    );
    await suggestions.save();
    res.status(200).json({ message: 'User suggestions removed' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Admin: Update settings
async function updateSuggestionSettings(req, res) {
  try {
    const { enableAutoSuggestions, autoSuggestionType } = req.body;
    const suggestions = await ensureSuggestionsExist();

    if (enableAutoSuggestions !== undefined) suggestions.enableAutoSuggestions = enableAutoSuggestions;
    if (autoSuggestionType !== undefined) suggestions.autoSuggestionType = autoSuggestionType;

    await suggestions.save();
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Track search
async function trackSearch(req, res) {
  try {
    const { searchQuery, productId, tags } = req.body;
    const userId = req.user._id;

    if (!searchQuery) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    await SearchHistory.create({
      user: userId,
      searchQuery,
      productId: productId || undefined,
      tags: tags || [],
    });

    res.status(201).json({ message: 'Search tracked' });
  } catch (error) {
    console.error('Error tracking search:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

module.exports = {
  getSuggestions,
  getDefaultSuggestions,
  updateDefaultSuggestions,
  getAllUserSuggestions,
  setUserSuggestions,
  removeUserSuggestions,
  updateSuggestionSettings,
  trackSearch,
  getOrderBasedSuggestions,
  getSearchBasedSuggestions,
  getRelatedProductSuggestions,
  getHybridSuggestions,
};