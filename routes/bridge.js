const express = require('express');
const router = express.Router();
const Orders = require('../controllers/orders');

router.get('/orders', Orders.getAll);
router.post('/orders', Orders.newOrder);

module.exports = router;