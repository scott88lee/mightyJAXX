const Users = require('../models/users');
const bcrypt = require('bcrypt');

const listAll = async (req, res) => {
    let result = await Users.getAll();
    res.json(result);
}

const createNew = async (req, res) => {
    const validate = require('../helpers/validators');

    //Validation block
    if (!validate.emailString(req.body.email)) {
        res.status(400).json({ Success: false, Message: 'Invalid email' });
        return;
    }
    if (!validate.passwordLength(req.body.password)) {
        res.status(400).json({ Success: false, Message: 'Password must be at least 8 characters long' });
        return;
    }
    if (!validate.containsLowerCase(req.body.password)) {
        res.status(400).json({ Success: false, Message: 'Password must contain at least 1 lowercase character.' });
        return;
    }
    if (!validate.containsUpperCase(req.body.password)) {
        res.status(400).json({ Success: false, Message: 'Password must contain at least 1 uppercase character.' });
        return;
    }
    if (!validate.containsNumber(req.body.password)) {
        res.status(400).json({ Success: false, Message: 'Password must contain at least 1 number.' });
        return;
    }
    let exist = await Users.findUser(req.body.email);
    if (exist) {
        res.status(400).json({ Success: false, Message: 'User already exist.'});
        return;
    }

    // Create new user
    let hash = await bcrypt.hash(req.body.password, 8);
    let user = await Users.create(
        {
            email: req.body.email,
            pwdHash: hash
        }
    );

    //Send JWT
    res.json({
        id: user.insertedId,
        email: req.body.email
    });
}

//Delete user
const deleteUser = async (req, res) => {
    let body = req.body;
    console.log(req.body);
    let result = await Users.getAll();
    res.json(result);
}

module.exports = {
    listAll,
    createNew,
}