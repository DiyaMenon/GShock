const Product = require('../models/product.model');
const Workshop = require('../models/workshop.model');
const Artwork = require('../models/artwork.model');

// Cache Settings
let cachedContext = null;
let lastFetchTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 Minutes

async function getSystemContext() {
  try {
    const now = Date.now();
    // Use cache if fresh
    if (cachedContext && (now - lastFetchTime < CACHE_TTL)) {
      return cachedContext;
    }

    console.log("🔄 Refreshing Chatbot Context...");

    const [products, workshops, artworks] = await Promise.all([
      Product.find({ stockStatus: 'In Stock' }).lean(),
      Workshop.find({ status: 'Approved', isActive: true }).sort({ date: 1 }).lean(), // Sorted by date
      Artwork.find({ status: 'Available' }).lean()
    ]);

    // --- 1. CRITICAL: Add Date Awareness ---
    // The bot needs to know "Today" to calculate "Next Week" or "Upcoming"
    const todayStr = new Date().toDateString();
    let context = `SYSTEM CONTEXT:\n- TODAY'S DATE: ${todayStr}\n- LOCATION: Rabuste Coffee (Ahmedabad, Gujarat)\n\nINVENTORY DATA:\n`;

    // --- 2. Format Menu ---
    if (products.length > 0) {
      context += "=== ☕ CAFE MENU ===\n";
      products.forEach(p => {
        // Add more details for better answers
        const info = [p.tastingNotes, p.description].filter(Boolean).join('. ');
        context += `- ITEM: "${p.name}" | TYPE: ${p.category} | PRICE: ₹${p.price} | FLAVOR: ${info} | IMG: ${p.imageUrl}\n`;
      });
    }

    // --- 3. Format Workshops ---
    if (workshops.length > 0) {
      context += "\n=== 🎓 WORKSHOPS SCHEDULE ===\n";
      workshops.forEach(w => {
        const d = new Date(w.date);
        context += `- WORKSHOP: "${w.title}" | DATE: ${d.toDateString()} | PRICE: ₹${w.price} | DETAILS: ${w.description} | IMG: ${w.primaryImageUrl}\n`;
      });
    }

    // --- 4. Format Art ---
    if (artworks.length > 0) {
      context += "\n=== 🎨 ART GALLERY ===\n";
      artworks.forEach(a => {
        context += `- ART: "${a.title}" by ${a.artistName} | PRICE: ₹${a.price} | STYLE: ${a.tastingNotes} | IMG: ${a.primaryImageUrl}\n`;
      });
    }

    cachedContext = context;
    lastFetchTime = now;
    return context;

  } catch (error) {
    console.error("❌ Context Error:", error);
    return "Error loading inventory.";
  }
}

module.exports = { getSystemContext };