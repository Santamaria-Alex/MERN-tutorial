const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    //checking for authorization header
    //checking auth header start with Bearer
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      //get token from header that starts with Bearer
      //Bearer "token"
      //using split to get rid of the space between bearer and token and getting the second part which is the token
      //assigning token to this variable (token)
      token = req.headers.authorization.split(" ")[1];

      //verify token by decoding
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from token, token has user id from payload
      //getting this info from when we generate the JWT in userController
      req.user = await User.findById(decoded.id).select("-password");

      next(); //call next piece of middleware
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error("NOT AUTHORIZED");
    }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No Token");
  }
});

module.exports = { protect };
