const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://node_db_user:r63GSXlRHCLECYY0@namastenode.efqzwwp.mongodb.net/devTinder");
};


module.exports = connectDB;