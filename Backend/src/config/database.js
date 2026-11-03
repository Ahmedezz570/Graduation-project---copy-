const mongoose = require('mongoose');

const connect = async () => {
    try { 
       await mongoose.connect(process.env.MONGO_URI );
       console.log("MongoDB is connected successfully");
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
    }

}

module.exports = connect;