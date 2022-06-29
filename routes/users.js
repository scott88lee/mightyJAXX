const express = require('express');
const router = express.Router();
const Users = require('../controllers/users');
const passport = require('passport');

router.post('/', Users.createNew);
router.post('/:id', Users.getUser);

//Protected routes
router.put('/:id', passport.authenticate('jwt', { session: false }), Users.updateUser);

module.exports = router;