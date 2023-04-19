// All require modules
const express = require('express');
const path = require('path');

// For configuration

const db = require('./config/mongoose');
const task = require('./model/task');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

// Creating application
const app = express();

// Setting up view engine
app.set('view engine', 'ejs');

// Setting up the port number
const port = 3000;

// setting up the webpages
app.set('Views', path.join(__dirname, 'Views'));

// Convert or parse the data into which can use at the runtime
app.use(express.urlencoded());

// Accessing the static files like css, js etc and storing and fetching images
app.use(express.static('assets'));

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// ----------------- routes -----------------------------

// to view all the contacts in the database
app.use('/', require('./routes'));

// -------------- Start server ------------------------
// Creating the server
app.listen(port, function(err) {
    if (err) { console.log(err); return; }
    console.log("Express is running on ", port);
});