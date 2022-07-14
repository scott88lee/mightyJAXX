const db = require('../../db/connection');

const getAll = async (req, res) => {
    let Watchlist = db.query().collection('watchlist');
    let list = await Watchlist.find({}).toArray();
    res.send(list);
}

const addToList = async (req, res) => {
    let Watchlist = db.query().collection('watchlist');
    let list = await Watchlist.insertOne(req.body);
    res.send(list);
}


module.exports = {
    getAll,
    addToList
}

