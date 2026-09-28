const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //referance to the user collection
            require: true,
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            require: true,
        },
        status:{
            type : String,
            require : true,
            enum: {
                values: ["ignored", "interested", "accepted","rejected"],
                message: `{VALUE} is incorrect status type`,
            },
        },
    },
    {timestamps:true}
);

connectionRequestSchema.index({fromUserId:1 , toUserId: 1});

connectionRequestSchema.pre("save" , function () {
    const connectionRequest =this;
    //check if the fromUserId is same as the toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send request to yourself");
    }
    // next();
});   

const ConnectionRequest = new mongoose.model(
    "ConnectionRequest", connectionRequestSchema
);

module.exports = ConnectionRequest;