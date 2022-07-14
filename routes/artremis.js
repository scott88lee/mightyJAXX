const express = require('express');
const router = express.Router();
const watchlist = require('../controllers/artremis/watchlist');

router.get('/watchlist', watchlist.getAll);
router.post('/watchlist', watchlist.addToList);

module.exports = router;