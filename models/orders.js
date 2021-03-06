const db = require('../db/connection')

const getAll = async () => {
    const Orders = db.query().collection('orders');
    let result = await Orders.find({}).toArray();
    return result;
}

const newOrder = async (order) => {
    const Orders = db.query().collection('orders');
    let result = await Orders.insertOne(order);
    return result;
}

const flushOrders = async () => {
    const Orders = db.query().collection('orders');
    let result = await Orders.deleteMany({});
    return result;
}

module.exports = {
    getAll,
    newOrder,
    flushOrders
}
