const mongoose = require('mongoose');

// Connection URL
const uri = 'mongodb://localhost:27017/inventory';

// Initialize Connection Once and Create Connection Pool
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    function (err) {
        if (err) throw err;
        console.log('Database Connected');
    })