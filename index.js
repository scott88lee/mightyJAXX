const express = require('express');
const app = express();
const db = require('./db/connection')

// Middleware
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
app.use('/users', require('./routes/users'))

//Root and 404
app.get('/', (req, res) => {res.send('Hello world')})
app.get('*', (req, res) => {res.sendStatus(404)});


const PORT = process.env['PORT'] || 3000;
db.connect(() => {
    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`)
    })
});