// calling express for using to build my API
const express = require('express');
const cors = require('cors');

// Create an instance of the Express application - app to add middleware and routes
const app = express();
// to control frontend access to the backend API we use cors middleware
app.use(cors());
// to make express to read data from frontend JSON format (ex: {name : "John" , age : 30}) we use express.json() middleware
app.use(express.json());

// My first route to test the backend API is working or not
app.get("/",(req , res )=>{
     res.status(200).json({
        success : true ,
        message : "Welcome to the Backend API"            
     });               
});


module.exports = app ;