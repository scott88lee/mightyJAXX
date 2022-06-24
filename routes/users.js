const express = require('express');
const router = express.Router();
const Users = require('../controllers/users');

router.get('/', Users.listAll);

module.exports = router;