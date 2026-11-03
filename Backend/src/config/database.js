const mongoose = require('mongoose');
MONGO_URI="mongodb+srv://ahmedez570_db_user:LPxFOdSmub2grIGk@cluster0.ct6uclz.mongodb.net"
JWT_SECRET = "Ezzat1234"
const connect = async () => {
    try {
       mongoose.connect(MONGO_URI );
       console.log("MongoDB is connected successfully");
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
    }

}

module.exports = connect;