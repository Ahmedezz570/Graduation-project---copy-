const express = require('express');
const cors = require('cors');
const authRoutes = require('./modules/auth/routes');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get("/",(req , res )=>{
     res.status(200).json({
        success : true ,
        message : "Welcome to the Backend API"            
     });               
});
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app ;