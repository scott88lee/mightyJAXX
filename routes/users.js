const express = require('express');
const router = express.Router();
const Users = require('../controllers/users');

router.post('/', Users.createNew);
router.get('/', Users.listAll);

module.exports = router;