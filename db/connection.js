const { MongoClient } = require('mongodb');

require('dotenv').config()
let uri = process.env['DB_URI'] || console.log('Missing DB ENV variable.\n')

let mongodb;
let client;

function connect(callback) {
    MongoClient.connect(uri, (err, db) => {
        if (err) { console.log(err) }
        else {
            console.log('MongoDB connected.')
            client = db;
            mongodb = db.db('test');
            callback();
        }
    });
}

function query() {
    return mongodb;
}

function mongoClient() {
    return client;
}

module.exports = {
    connect,
    query,
    mongoClient
};