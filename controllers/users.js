const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const validate = require('../helpers/validators');
const mailer = require('../helpers/mailer');
const auth = require('../helpers/auth');

const createNew = async (req, res) => {

    // Validation block
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
    }// End of validation block

    // Hash password
    // Create new user
    // Send email
    // Send JWT
    try {

        let hash = await bcrypt.hash(req.body.password, 8);
        let user = await Users.create(
            {
                email: req.body.email,
                pwdHash: hash
            }
        );

        const payload = {
            sub: user.insertedId,
            iat: Date.now()
        };

        await mailer.sendEmail(req.body.email);

        const secret = process.env['JWT_SECRET']
        const signedToken = jwt.sign(payload, secret, { expiresIn: 172800, algorithm: 'HS256' });
        res.json({
            id: user.insertedId,
            token: "Bearer " + signedToken,
            expires: 172800
        })
    } catch (err) {
        console.log(err)
    }
}

//Get user
const getUser = async (req, res) => { //Modified to POST
    try {
        let user = await Users.findUserById(req.params.id);
        //console.log(user)

        // Send ambiguous response to prevent Username brute forcing
        if (user && user.email === req.body.email) {
            let verified = await auth.validPassword(req.body.password, user.pwdHash)
            console.log(verified)
            if (verified) {
                const tokenObject = auth.issueJWT(user);
                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
            }
        }
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    } catch (err) {
        console.log(err)
    }
}

const updateUser = async (req, res) => {
    try {
        // let user = await Users.findUserById(req.params.id)
        let token = req.headers.authorization.split(' ')[1];
        let data = auth.decode(token)
        console.log(data);

        //Validation block
        if (data.sub !== req.params.id) {  // Also checks if user exist.
            res.status(401).json({ success: false, message: 'Unauthorized.' });
            return;
        }
        // Assuming username is refering to email in Readme.md
        if (!validate.emailString(req.body.email)) {
            res.status(400).json({ Success: false, Message: 'Invalid email' });
            return;
        }// End of validation block

        // Update user
        let success = await Users.updateEmail(req.params.id, req.body.email);

        if (success.acknowledged) {
            res.status(200).json({ success: true, msg: "Updated email." });
        } else {
            res.status(400).json({ success: false, msg: "Something went wrong!" });
        }
    } catch (err) {
        console.log(err)
    }
}

//Delete user
const deleteUser = async (req, res) => {

    try {
        // let user = await Users.findUserById(req.params.id)
        let token = req.headers.authorization.split(' ')[1];
        let data = auth.decode(token)
        console.log(data);

        //Validation block
        if (data.sub !== req.params.id) {  // Also checks if user exist.
            res.status(401).json({ success: false, message: 'Unauthorized.' });
            return;
        }

        // Delete user
        let success = await Users.deleteUser(req.params.id);
        console.log(success)

        if (success) {
            res.status(200).json({ success: true, msg: "Deleted user." });
        } else {
            res.status(400).json({ success: false, msg: "Something went wrong!" });
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    createNew,
    getUser,
    updateUser,
    deleteUser
}