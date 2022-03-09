const mongoose = require("mongoose");

//all mongoose methods are asynchronous, they return a promise
//this function is basically making the mongoose connection to this application
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://alexSantamaria:Pumasa10@alexcluster.yefqy.mongodb.net/mernapp?retryWrites=true&w=majority"
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1); //exit the process with failure
  }
};

module.exports = connectDB;
