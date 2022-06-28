const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
        res.status(400).json({ Success: false, Message: 'User already exist.' });
        return;
    }//End of validation block

    // Create new user
    try {

        let hash = await bcrypt.hash(req.body.password, 8);
        let user = await Users.create(
            {
                email: req.body.email,
                pwdHash: hash
            }
        );

        const payload = {
            id: user.insertedId,
            iat: Date.now()
        };

        const secret = process.env['JWT_SECRET']
        const signedToken = jwt.sign(payload, secret, { expiresIn: '1d', algorithm: 'HS256' });
        res.json({
            id: user.insertedId,
            token: "Bearer " + signedToken,
            expires: "1d"
        })
    } catch (err) {
        console.log(err)
    }
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