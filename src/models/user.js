const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastname: {
        type: String
    },
    password: {
        type: String
    },
    emailId: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);;