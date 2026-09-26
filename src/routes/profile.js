const express = require('express');
const {validateEditProfileData} = require("../utils/validation");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

profileRouter.get("/profile/view",userAuth, async (req,res)=> {
    try{ 
    
    const user = req.user;
    
    res.send(user);
    }catch (err) {
        res.status(404).send("something went wrong");
    }
});

profileRouter.patch("/profile/edit",userAuth,async (req,res)=> {
    try{

        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
            //or
            // return res.status(400).send("Invalid Edit Request");
        }

        const loggedInUser = req.user;
        // console.log(loggedInUser);

        Object.keys(req.body).forEach((key) =>(loggedInUser[key] = req.body[key]));
        //  console.log(loggedInUser);

        await loggedInUser.save();
         res.json({message: "Profile Updated Sucessfully", Data: loggedInUser});
    }catch(err){
        res.status(400).send("Err :"+err);
    }

})

module.exports = profileRouter;