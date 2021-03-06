const Orders = require('../models/orders');

const getAll = async (req, res) => {
    const orders = await Orders.getAll();
    res.json(orders);
}

const newOrder = async (req, res) => {
    const order = await Orders.newOrder(req.body);
    res.json(order);
}

const flushOrders = async (req, res) => {
    await Orders.flushOrders();
    res.send("200 OK");
}

module.exports = {
    getAll,
    newOrder,
    flushOrders
}