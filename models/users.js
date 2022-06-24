const db = require('../db/connection')

const getAll = async () => {
    const Users = db.query().collection('users');
    let result = await Users.find({}).toArray();
    return result;
}

module.exports = {
    getAll,
}