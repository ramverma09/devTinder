const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { data } = require("react-router-dom");

const userRouter = express.Router();

//get all the pending connectioon request for the loggedIn user
userRouter.get("/user/requests/recieved",userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status:"interested"
        }).populate("fromUserId", "firstName lastName photoUrl age skills");
        // }).populate("fromUserId", ["firstName","lastName "]);

        res.json({message: "Data fetched sucessfully" , data: connectionRequests}); 

    }catch(err){
        res.status(400).send("ERROR :"+err.message);
    }

});

module.exports = userRouter;