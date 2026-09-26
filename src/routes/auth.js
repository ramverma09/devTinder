const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require('bcrypt');



authRouter.post("/signup", async (req,res)=>{

    // console.log(req.body);
    try{
    //validate the data     
    validateSignUpData(req);

    //encrypt password
    const {firstName, lastName, emailId, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log("Password Hash: ", passwordHash);

    // create new instance of user model and save it to the database
    const user = new User({
        firstName,lastName ,emailId,password :passwordHash
    });

    
        await user.save();
        res.send("User data saved successfully to the database");
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});

authRouter.post("/login", async (req,res) =>{ 

    try{
        const {emailId, password} = req.body;
        
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("INvalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            const token = await user.getJWT( );

            res.cookie("token", token,{expires: new Date(Date.now()+ 8*3600000,)});

            res.send("User logged in successfully");
        } else {
            throw new Error("Invalid credentials");
        }

    } catch(err) {
        res.status(400).send("Error : " + err.message);
    }
});

module.exports = authRouter;