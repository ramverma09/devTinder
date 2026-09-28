const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { data } = require("react-router-dom");

const userRouter = express.Router();

const USER_SAFE_DATA ="firstName lastName photoUrl age about skills";

//get all the pending connectioon request for the loggedIn user
userRouter.get("/user/requests/recieved",userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status:"interested"
        }).populate("fromUserId", USER_SAFE_DATA);
        // }).populate("fromUserId", ["firstName","lastName "]);

        res.json({message: "Data fetched sucessfully" , data: connectionRequests}); 

    }catch(err){
        res.status(400).send("ERROR :"+err.message);
    }

});

userRouter.get("/user/connections",userAuth, async (req,res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId :loggedInUser._id, status: "accepted"},
                {fromUserId :loggedInUser._id, status: "accepted"}
            ],
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA); 

        const data = await connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString() == loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId ;
        });
        res.json({data});
    }
catch(err){
    res.status(400).send({message: err.message});
}
});

module.exports = userRouter;