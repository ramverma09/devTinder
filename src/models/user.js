const mongoose = require('mongoose');

const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

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
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough"+value);
            }
        }
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address"+value);
            }
        }
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
        default: "https://hostalitecloud.com/crb/wp-content/uploads/2025/10/dummy-user-male.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL"+value);
            }
        }
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

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id},"DEV@Tinder$790", {expiresIn: "7d",});

    return token;

}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;

    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);;