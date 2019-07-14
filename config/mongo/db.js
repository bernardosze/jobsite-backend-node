const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoConn');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        await console.log('MongoDB connected');
    } catch(err) {
        console.log('unable to connect to MongoDB');
        process.exit();
    }
}

module.exports = connectDB;