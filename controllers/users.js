const Users = require('../models/users');

const listAll = async (req, res) => {
    let result = await Users.getAll();
    res.json(result);
}

const createNew = async (req, res) => {
    let body = req.body;
    console.log(req.body);
    
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