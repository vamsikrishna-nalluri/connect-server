// app.js

const express = require('express');
const bodyParser = require('body-parser');

// Set up mongoose connection
const mongoose = require('mongoose');
let DEV_DB_URL = 'mongodb://admin:password123@ds257372.mlab.com:57372/connect-db';
let mongoDB = process.env.MONGODB_URI || DEV_DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./models/models');
require('./config/passport');
app.use(require('./routes/app.route')); // import all the routes




let port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
