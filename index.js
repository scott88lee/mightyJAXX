const express = require('express');
const app = express();

const db = require('./db/connection')
const passport = require('passport');
const cors = require('cors');

// Middleware
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Pass the global passport object into the configuration function
require('./config/passport')(passport);
// This will initialize the passport object on every request
app.use(passport.initialize());

//Routes
app.use('/users', require('./routes/users'));

//Root and 404
app.get('/', (req, res) => {res.send('Hello world')});
app.get('*', (req, res) => {res.sendStatus(404)});


const PORT = process.env['PORT'] || 3000;
db.connect(() => {
    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`)
    })
});