const express  = require('express');

const app = express();

app.use( "/", (req,res) =>{
    res.send('Hello World and Namaste from  Dashboard');
});

app.use( "/hello", (req,res) =>{
    res.send('Hello World , Hello Hello hello');
});

app.use( "/test", (req,res) =>{
    res.send('Hello World from Test');
});

app.listen(7777, ()=>{
    console.log('Server is running on port 7777');
});