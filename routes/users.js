const express = require('express');
const router = express.Router();
const Users = require('../controllers/users');

router.post('/', Users.createNew);
router.post('/:id', Users.getUser);

module.exports = router;