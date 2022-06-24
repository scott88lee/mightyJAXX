const Users = require('../models/users');

const listAll = async (req, res) => {
    console.log('List All');
    let result = await Users.getAll();

    res.json(result);
}

module.exports = {
    listAll,
}