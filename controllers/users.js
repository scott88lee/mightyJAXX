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
            id: user.insertedId,
            iat: Date.now()
        };

        await mailer.sendEmail(req.body.email);

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

//Get user
const getUser = async (req, res) => { //Modified to POST
    let user = await Users.findUser(req.params.id);
    // Send ambiguous response to prevent Username brute forcing
    if (user) {
        let verified = auth.validPassword(req.body.password, user.pwdHash)
        if (isValid) {
            const tokenObject = utils.issueJWT(user);
            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
        } else {
            res.status(401).json({ Success: false, Message: 'Invalid user or password.' });
        }
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
    createNew,
    getUser,
}