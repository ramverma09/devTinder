const express  = require('express');
const connectDB= require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());


// init - dataBase
app.post("/signup", async (req,res)=>{

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

app.post("/login", async (req,res) =>{ 

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

app.get("/profile",userAuth, async (req,res)=> {
    try{ 
    
    const user = req.user;
    
    res.send(user);
    }catch (err) {
        res.status(404).send("something went wrong");
    }
});

app.post("/sendConnectionRequest",userAuth, async (req,res) => {
    //sending a connection request
    const user = req.user;
    console.log("Sending a connection request");

    res.send(user.firstName+" send the connection reqest");
})

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777, ()=>{
    console.log('Server is running on port 7777');
});
}).catch((err) => {
    console.log("Error while connecting to database");
});




// -------for testing api-------
// // Get user data api - get /user -> get user data from the database
// app.get("/user",async (req,res)=>{
//     const userEmail = req.body.emailId;
//     try{
//         const users = await User.find({emailId: userEmail});
//         if(users.length ===0){
//             res.status(404).send("User not found");
//         } else {
//             res.send(users);
//         }
//     } catch (err) {
//         res.status(404).send("something went wrong");
//     }
// });


// // Feed Api - Get /feed -> get all the users data from the database
// app.get("/feed",async (req,res) => {
//     try{
//         const users = await User.find({});
//         res.send(users);
//     } catch (err) {
//         res.status(500).send("Error fetching user data: " + err.message);
//     } 
// });


// // Delete user data api - delete /user -> delete user data from the database
// app.delete("/user", async (req,res) => {
//     const userId = req.body.userId;
//     try{
//         const user = await User.findByIdAndDelete({_id: userId});
//         // const user = await User.findOneAndDelete(userId );
//         if(!user){
//             res.status(404).send("User not found");
//         } else {
//             res.send("User deleted successfully");
//         }

//     } catch (err) {
//         res.status(404).send("something went wrong");
//     }
// });


// //update user data api - patch /user -> update user data in the database
// app.patch("/user/:userId",async (req,res)=>{
//     const userId = req.params?.userId;
//     const data = req.body;
//     // console.log(data);

    
//     //     {
//         //     "userId": "6aaebaf0cc6503085319102b",
//         //     "age":18,
//         //     "emailId": "ranbir@gmail.com",
//         //     "gender": "male",
//         //     "skills": ["javascript","acting","drama"],
//         //     "xyz": "sdfvsv"
//         // }
        
    

//     try{

//         const ALLOWED_UPDATES = ["photoUrl", "about", "gender","age","skills"];
//         const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

//         if(!isUpdateAllowed){
//           throw new Error("Invalid updates");
//         }
//         if(data?.skills.length > 10){
//             throw new Error("Skills cannot be more than 10");
//         }

//         await User.findByIdAndUpdate({ _id:userId},data, {returnDocument: "after",
//             runValidators: true 
//         });
//         // console.log(user);
//         res.send("User data updated successfully");

//     }catch(err){
//         res.status(404).send("Update failed: " + err.message);
//     }
// });

// connectDB().then(() => {
//     console.log("Database connected successfully");
//     app.listen(7777, ()=>{
//     console.log('Server is running on port 7777');
// });
// }).catch((err) => {
//     console.log("Error while connecting to database");
// });



// -------------writing middlewares for error handling------------
// app.use("/",(err,req,res,next) =>{
//     if(err){
//     res.status(500).send("Some Server Error");
// }
// });

// app.use("/getuserData", (req,res) =>{
//     try{
//         //fetch user data from DB
//         throw new Error("Something went wrong while fetching user data");
//         res.send("User data fetched successfully");
//     }catch(err){
//         res.status(500).send("something went wrong");
//     }

// });

// app.use("/",(err,req,res,next) =>{
//     if(err){
//     res.status(500).send("Some Server Error");
// }
// });


// -------------writing middlewares for authentication and authorization----------------
// const {adminAuth,userAuth} = require("./middlewares/auth.js");

// app.use("/admin", adminAuth);

// app.get("/user",userAuth, (req,res) =>{
//     res.send("User data fetched successfully");
// });

// app.get("/admin/getAllData", (req,res,) =>{
//         res.send("All data fetched successfully"); 
// });

// app.delete("/admin/deleteUser", (req,res) =>{
//        res.send("User deleted successfully");
// });

// ----------
// app.use("/", (req,res,next) =>{
//     console.log("Middleware 1");
//     next();
// }); 

// app.get("/user", (req, res, next) => {
//     console.log("User routes initialized 1");
//     // res.send("Response 1");
//     next();
// },
//     (req, res,next) => {
//         console.log("User routes initialized 2");
//         res.send("User routes initialized 2");
//         // next();
//     }
// );
// -------------------


// app.get("/user/:userId/:name/:password", (req,res) =>{
//     console.log(req.params);
//     res.send({"firstName": "Ram", "lastName": "Verma"});
// });

// app.post("/user", (req,res) =>{
//     // Saved the data to database
//     res.send("Data saved successfully to the database");
// });
 
// app.delete("/user", (req,res) =>{
//     // Delete the data from database
//     res.send("Data deleted successfully from the database");
// });

// app.use( "/test", (req,r  es) =>{
//     res.send('Hello World from Test');
// });

// app.use( "/hello", (req,res) =>{
//     res.send('Hello World , Hello Hello hello');
// });
// app.use( "/", (req,res) =>{
//     res.send('Hello World and Namaste from  Dashboard');
// });

// app.listen(7777, ()=>{
//     console.log('Server is running on port 7777');
// });