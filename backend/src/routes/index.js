const express = require('express');

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const cartRoutes = require('./cart.routes');
const adminRoutes = require('./admin.routes');
const artworkRoutes = require('./artwork.routes');
<<<<<<< HEAD
// const workshopRoutes = require('./workshop.routes');
=======
const workshopRoutes = require('./workshop.routes');
const mediaRoutes = require('./media.routes');
>>>>>>> 6aebf48c766d85621142c7ad4c0fcee5f7c9b907
const orderRoutes = require('./order.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/admin', adminRoutes);
router.use('/artworks', artworkRoutes);
<<<<<<< HEAD
// router.use('/workshops', workshopRoutes);
=======
router.use('/workshops', workshopRoutes);
router.use('/media', mediaRoutes);
>>>>>>> 6aebf48c766d85621142c7ad4c0fcee5f7c9b907
router.use('/orders', orderRoutes);

module.exports = router;

