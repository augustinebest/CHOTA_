const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// const cookieParser = require('cookie-parser');
// const MongoStore = require('connect-mongo')(cookieSession);
const passport = require('passport');
const app = express();
const passportSetup = require('./Controllers/userControllers');


//require routes
const itemRoutes = require('./routes/item');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');

//Connecting to the local database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mernCart', { useNewUrlParser: true }); 

// Connection to mlab
// mongoose.connect('mongodb://chotaapp:chota123@ds033484.mlab.com:33484/chota', { useNewUrlParser: true })

//Body-parser Middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// View Engine
app.set('view engine', 'ejs');

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Initializing passport
app.use(passport.initialize());
app.use(passport.session());

//Use routes
app.use('/item', itemRoutes);
app.use('/auth', userRoutes);
app.use('/profile', profileRoutes);


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
    res.send('<h1>Hello World1133!</h1>');
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