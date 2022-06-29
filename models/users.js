const { ObjectId } = require('mongodb');
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

const findUserById = async (id) => {
    try {
        const Users = db.query().collection('users');
        let result = await Users.findOne({ _id: ObjectId(id) });
        return result;
    } catch (err) {
        return false;
    }
}

const create = async (user) => {
    const Users = db.query().collection('users');
    let result = await Users.insertOne(user);
    return result;
}

const updateEmail = async (id, email) => {
    const Users = db.query().collection('users');
    let result = await Users.updateOne({ _id: ObjectId(id) }, { $set: { email } });
    return result;
}

const deleteUser = async (id) => {
    const Users = db.query().collection('users');
    let result = await Users.deleteOne({ _id: ObjectId(id)});
    return result;
}

module.exports = {
    getAll,
    findUser,
    findUserById,
    create,
    deleteUser,
    updateEmail
}