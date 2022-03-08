//express.js, a node.js framework
const express = require("express");
//to have environment variables
//config allows us to have a dotenv file with variables in it
const dotenv = require("dotenv").config();
//port we want our server to run on
const port = process.env.PORT || 5000;

const app = express();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
