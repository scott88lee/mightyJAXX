require('dotenv').config();

const express = require('express');
const app = express();

const db = require('./db/connection')
const passport = require('passport');
const cors = require('cors');

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Pass the global passport object into the configuration function
require('./config/passport')(passport);
// This will initialize the passport object on every request
app.use(passport.initialize());


//Loads the handlebars module
const {engine} = require('express-handlebars');//Sets our app to use the handlebars engine
app.engine('hbs', engine());
app.set('view engine', 'hbs');
app.set("views", "./views");


//Routes
app.use('/users', require('./routes/users'));
app.use('/bridge', require('./routes/bridge'));
app.use('/artremis', require('./routes/artremis'));

//Root and 404
app.get('/', (req, res) => { res.render('home', {layout:'main'}) });
app.get('*', (req, res) => { res.sendStatus(404) });


const PORT = process.env['PORT'] || 3000;
db.connect(() => {
    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`)
    })
});