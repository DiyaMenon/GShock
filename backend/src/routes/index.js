const express = require('express');

const sampleRoutes = require('./sample.routes');

const router = express.Router();

router.use('/sample', sampleRoutes);

module.exports = router;

