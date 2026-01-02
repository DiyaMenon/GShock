const Order = require('../models/order.model');

// Get all orders (admin only)
async function getOrders(req, res) {
    try {
        const orders = await Order.find().populate('user').sort({ createdAt: -1 });
        
        // Manually populate items based on their itemType to handle polymorphic references
        for (let order of orders) {
            for (let i = 0; i < order.items.length; i++) {
                const item = order.items[i];
                let populatedItem;
                
                if (item.itemType === 'menu') {
                    const Product = require('../models/product.model');
                    populatedItem = await Product.findById(item.itemId);
                } else if (item.itemType === 'artwork') {
                    const Artwork = require('../models/artwork.model');
                    populatedItem = await Artwork.findById(item.itemId);
                } else if (item.itemType === 'workshop') {
                    const Workshop = require('../models/workshop.model');
                    populatedItem = await Workshop.findById(item.itemId);
                }
                
                if (populatedItem) {
                    order.items[i].itemId = populatedItem;
                }
            }
        }
        
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function getOrderById(req, res) {
    try {
        const order = await Order.findById(req.params.id).populate('user');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Manually populate items based on their itemType to handle polymorphic references
        for (let i = 0; i < order.items.length; i++) {
            const item = order.items[i];
            let populatedItem;
            
            if (item.itemType === 'menu') {
                const Product = require('../models/product.model');
                populatedItem = await Product.findById(item.itemId);
            } else if (item.itemType === 'artwork') {
                const Artwork = require('../models/artwork.model');
                populatedItem = await Artwork.findById(item.itemId);
            } else if (item.itemType === 'workshop') {
                const Workshop = require('../models/workshop.model');
                populatedItem = await Workshop.findById(item.itemId);
            }
            
            if (populatedItem) {
                order.items[i].itemId = populatedItem;
            }
        }
        
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function createOrder(req, res) {
    try {
        const order = await Order.create(req.body);
        let populatedOrder = await order.populate('user');
        
        // Manually populate items based on their itemType to handle polymorphic references
        for (let i = 0; i < populatedOrder.items.length; i++) {
            const item = populatedOrder.items[i];
            let populatedItem;
            
            if (item.itemType === 'menu') {
                const Product = require('../models/product.model');
                populatedItem = await Product.findById(item.itemId);
            } else if (item.itemType === 'artwork') {
                const Artwork = require('../models/artwork.model');
                populatedItem = await Artwork.findById(item.itemId);
            } else if (item.itemType === 'workshop') {
                const Workshop = require('../models/workshop.model');
                populatedItem = await Workshop.findById(item.itemId);
            }
            
            if (populatedItem) {
                populatedOrder.items[i].itemId = populatedItem;
            }
        }
        
        res.status(201).json(populatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function updateOrder(req, res) {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Manually populate items based on their itemType to handle polymorphic references
        for (let i = 0; i < order.items.length; i++) {
            const item = order.items[i];
            let populatedItem;
            
            if (item.itemType === 'menu') {
                const Product = require('../models/product.model');
                populatedItem = await Product.findById(item.itemId);
            } else if (item.itemType === 'artwork') {
                const Artwork = require('../models/artwork.model');
                populatedItem = await Artwork.findById(item.itemId);
            } else if (item.itemType === 'workshop') {
                const Workshop = require('../models/workshop.model');
                populatedItem = await Workshop.findById(item.itemId);
            }
            
            if (populatedItem) {
                order.items[i].itemId = populatedItem;
            }
        }
        
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function updateOrderStatus(req, res) {
    try {
        const { orderStatus } = req.body;
        
        if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(orderStatus)) {
            return res.status(400).json({ message: 'Invalid status. Must be pending, processing, shipped, delivered, or cancelled.' });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus },
            { new: true }
        ).populate('user');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Manually populate items based on their itemType to handle polymorphic references
        for (let i = 0; i < order.items.length; i++) {
            const item = order.items[i];
            let populatedItem;
            
            if (item.itemType === 'menu') {
                const Product = require('../models/product.model');
                populatedItem = await Product.findById(item.itemId);
            } else if (item.itemType === 'artwork') {
                const Artwork = require('../models/artwork.model');
                populatedItem = await Artwork.findById(item.itemId);
            } else if (item.itemType === 'workshop') {
                const Workshop = require('../models/workshop.model');
                populatedItem = await Workshop.findById(item.itemId);
            }
            
            if (populatedItem) {
                order.items[i].itemId = populatedItem;
            }
        }
        
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// Get orders for current user
async function getMyOrders(req, res) {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('user')
            .sort({ createdAt: -1 });
        
        // Manually populate items based on their itemType to handle polymorphic references
        for (let order of orders) {
            for (let i = 0; i < order.items.length; i++) {
                const item = order.items[i];
                let populatedItem;
                
                if (item.itemType === 'menu') {
                    const Product = require('../models/product.model');
                    populatedItem = await Product.findById(item.itemId);
                } else if (item.itemType === 'artwork') {
                    const Artwork = require('../models/artwork.model');
                    populatedItem = await Artwork.findById(item.itemId);
                } else if (item.itemType === 'workshop') {
                    const Workshop = require('../models/workshop.model');
                    populatedItem = await Workshop.findById(item.itemId);
                }
                
                if (populatedItem) {
                    order.items[i].itemId = populatedItem;
                }
            }
        }
        
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function deleteOrder(req, res) {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// Update own order status (users can only cancel their own orders)
async function updateUserOrderStatus(req, res) {
    try {
        const { orderStatus } = req.body;
        const orderId = req.params.id;
        const userId = req.user._id;
        
        // Users can only cancel orders
        if (orderStatus !== 'cancelled') {
            return res.status(400).json({ message: 'Users can only cancel orders' });
        }
        
        // Find the order
        const order = await Order.findById(orderId).populate('user');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Check if the order belongs to the user
        if (order.user._id.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You can only cancel your own orders' });
        }
        
        // Check if order can be cancelled
        if (order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') {
            return res.status(400).json({ message: 'This order cannot be cancelled' });
        }
        
        // Update order status
        order.orderStatus = 'cancelled';
        await order.save();
        
        // Manually populate items based on their itemType to handle polymorphic references
        for (let i = 0; i < order.items.length; i++) {
            const item = order.items[i];
            let populatedItem;
            
            if (item.itemType === 'menu') {
                const Product = require('../models/product.model');
                populatedItem = await Product.findById(item.itemId);
            } else if (item.itemType === 'artwork') {
                const Artwork = require('../models/artwork.model');
                populatedItem = await Artwork.findById(item.itemId);
            } else if (item.itemType === 'workshop') {
                const Workshop = require('../models/workshop.model');
                populatedItem = await Workshop.findById(item.itemId);
            }
            
            if (populatedItem) {
                order.items[i].itemId = populatedItem;
            }
        }
        
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    getMyOrders,
    updateUserOrderStatus,
};
