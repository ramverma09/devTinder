const express  = require('express');
const connectDB= require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

// init - dataBase
app.post("/signup", async (req,res)=>{

    console.log(req.body);

    // create new instance of user model and save it to the database
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User data saved successfully to the database");
    } catch (err) {
        res.status(400).send("Error saving user data: " + err.message);
    }
});


app.get("/user",async (req,res)=>{
    const userEmail =req.body.emailId;
    try{
        const users = await User.find({emailId: userEmail});
        if(users.length ===0){
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(404).send("something went wrong");
    }
});

// Feed Api - Get /feed -> get all the users data from the database
app.get("/feed",async (req,res) => {
    try{
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(500).send("Error fetching user data: " + err.message);
    } 
});

app.delete("/user", async (req,res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id: userId});
        // const user = await User.findOneAndDelete(userId );
        if(!user){
            res.status(404).send("User not found");
        } else {
            res.send("User deleted successfully");
        }

    } catch (err) {
        res.status(404).send("something went wrong");
    }
});

app.patch("/user",async (req,res)=>{
    const userId = req.body.userId;
    const data = req.body;
    // console.log(data);
    try{
        await User.findByIdAndUpdate({ _id:userId},data, {returnDocument: "after",});
        // console.log(user);
        res.send("User data updated successfully");

    }catch(err){
        res.status(404).send("something went wrong");
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