const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength:3,
        maxlength: 30
    },
    lastname: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender must be male, female or other");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://hostalitecloud.com/crb/wp-content/uploads/2025/10/dummy-user-male.jpg"
    },
    about: {
        type: String,
        default: "This is a default about of the user!"
    },
    skills: {
        type: [String]
    },
},{
    timestamps: true
});

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);;