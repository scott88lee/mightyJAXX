const db = require('../db/connection')
const Orders = db.query().collection('orders');

const getAll = async () => {
    let result = await Orders.find({}).toArray();
    return result;
}

const newOrder = async (order) => {
    let result = await Orders.insertOne(order);
    return result;
}

module.exports = {
    getAll,
    newOrder,
}
