const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName || !emailId || !password){
        throw new Error("Missing required fields");
    }
    else if(firstName.length < 3 || firstName.length > 30){
        throw new Error("First name must be between 3 and 30 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email address");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }
}

module.exports = {
    validateSignUpData
}