const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose')
const path = require("path")

const app = express();
const port = process.env.PORT || 4000;

const inventoryRoutes = require('./routes/inventory')
const userRoutes = require('./routes/user')
require('./db/config');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static('client/build/'))

    app.get('/*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'client/build/'))
    })
}



// Routes that should handle requests
app.use('/inv', inventoryRoutes);
app.use('/usr', userRoutes);

// Catch errors that go beyond the above routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

// Passes direct errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(port, function () {
    console.log("Server is running on Port: " + port)
})