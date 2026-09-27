const express = require('express');
const {validateEditProfileData} = require("../utils/validation");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const bcrypt = require("bcrypt");


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

});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const loggedInUser = req.user;

        // 1. Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Current password and new password are required"
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                message: "New password must be at least 8 characters long"
            });
        }

        // 2. Verify current password
        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            loggedInUser.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Current password is incorrect"
            });
        }

        // 3. Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 4. Update password
        loggedInUser.password = hashedPassword;

        await loggedInUser.save();

        res.json({
            message: "Password updated successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
});

module.exports = profileRouter;