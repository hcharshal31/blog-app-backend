const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database successfully");
    } catch(err){
        console.log("Database connection unsuccussfull." + err);
    }
}

module.exports = connectDB;