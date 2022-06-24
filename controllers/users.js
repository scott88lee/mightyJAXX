const Users = require('../models/users');

const listAll = async (req, res) => {
    let result = await Users.getAll();
    res.json(result);
}

const createNew = async (req, res) => {
    const v = require('../helpers/validators');
    let body = req.body;
    
    if (!v.emailValidation(body.email)) {
        res.json({Success: false, Message: 'Invalid email'});
        return;
    }
    if (!v.passwordLength(body.password)){
        res.json({Success: false, Message: 'Password must be at least 8 characters long'});
        return;
    }
    if (!v.passwordCombination(body.password)) {
        res.json({Success: false, Message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'});
        return;
    }
    
    res.send('Ok');
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