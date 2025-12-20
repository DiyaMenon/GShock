const express = require('express');

const sampleController = require('../controllers/sample.controller');

const router = express.Router();

router.get('/', sampleController.getSamples);
router.post('/', sampleController.createSample);

module.exports = router;

