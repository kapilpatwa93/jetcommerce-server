const mongoose = require('mongoose');
let gracefulShutdown;
// let dbURI = 'mongodb://localhost/jetshop';
let dbURI = 'mongodb://kapilp:jetshop123@cluster0-shard-00-00-ofnc1.mongodb.net:27017,cluster0-shard-00-01-ofnc1.mongodb.net:27017,cluster0-shard-00-02-ofnc1.mongodb.net:27017/jetshop?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

