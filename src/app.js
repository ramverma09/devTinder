const express  = require('express');

const app = express();


app.get("/user", (req,res) =>{
    res.send({"firstName": "Ram", "lastName": "Verma"});
});

app.post("/user", (req,res) =>{
    // Saved the data to database
    res.send("Data saved successfully to the database");
});

app.delete("/user", (req,res) =>{
    // Delete the data from database
    res.send("Data deleted successfully from the database");
});

app.use( "/test", (req,res) =>{
    res.send('Hello World from Test');
});

// app.use( "/hello", (req,res) =>{
//     res.send('Hello World , Hello Hello hello');
// });
// app.use( "/", (req,res) =>{
//     res.send('Hello World and Namaste from  Dashboard');
// });

app.listen(7777, ()=>{
    console.log('Server is running on port 7777');
});