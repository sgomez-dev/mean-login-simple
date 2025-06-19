const mongoose = require('mongoose');
const dbUrl = require('./properties').DB;

module.exports = () => {
    mongoose.connect(dbUrl, { useNewUrlParser: true })
        .then(() => console.log(`Connected to MongoDB on ${dbUrl}`))
        .catch(err => console.error('Error connecting to MongoDB:', err));

    process.on('SIGINT', () => {
        mongoose.connection.close (() => {
            console.log(`Mongo is disconnected`);
            process.exit(0);
        });
    });
}