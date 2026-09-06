const express  = require('express');
const connectDB= require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req,res)=>{
    const user = new User({
        firstName: "Sachin",
        lastName: "Yadav",
        password: "sachin@123",
        emailId: "sachin@gmail.com",
    });

    try{
        await user.save();
        res.send("User data saved successfully to the database");
    } catch (err) {
        res.status(400).send("Error saving user data: " + err.message);
    }
});

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777, ()=>{
    console.log('Server is running on port 7777');
});
}).catch((err) => {
    console.log("Error while connecting to database");
});



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