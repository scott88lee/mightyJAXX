const db = require('../db/connection')

const getAll = async () => {
    const Users = db.query().collection('users');
    let result = await Users.find({}).toArray();
    return result;
}

const findUser = async (email) => {
    const Users = db.query().collection('users');
    let result = await Users.findOne({ email: email });
    return result;
}

module.exports = {
    getAll,
    findUser,
}