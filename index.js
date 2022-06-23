const express = require('express');
const app = express();
const db = require('./db/connection')

require('dotenv').config()

app.get('/', (req, res) => {
    res.send('Hello world')
})

const PORT = process.env['PORT'] || 3000;

db.connect(() => {
    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`)
    })
});