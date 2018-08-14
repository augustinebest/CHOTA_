const express = require('express');
const expressSession = require('express-session');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// const cookieParser = require('cookie-parser');
// const MongoStore = require('connect-mongo')(cookieSession);
const passport = require('passport');
const app = express();
const passportSetup = require('./Controllers/userControllers');
const keys = require('./config/keys');

//require routes
const itemRoutes = require('./routes/item');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const interestRoutes = require('./routes/interestRoutes');

//Connecting to the local database

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/mernCart', { useNewUrlParser: true }); 

// Connection to mlab
mongoose.connect(keys.mongodb, { useNewUrlParser: true });

//Body-parser Middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// View Engine
app.set('view engine', 'ejs');   

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Initializing passport
app.use(passport.initialize());
app.use(passport.session());

//Use routes
app.use('/item', itemRoutes);
app.use('/auth', userRoutes);
app.use('/profile', profileRoutes);
app.use('/interest', interestRoutes);

//CORS ERRORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Conrol-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
})

app.get('/', function(req, res) {
    res.render("index");
})

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})
module.exports = app;