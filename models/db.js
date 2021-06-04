const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('connected', () => {
    console.log('mongoose connected');
});

mongoose.connection.on('disconnect', () => {
    console.log('mongoose disconnected');
});

mongoose.connection.on('error', () => {
    console.log(err);
});

