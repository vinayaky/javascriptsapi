const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
//user resitation
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already exits");
  }
  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    userName,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data is not valid");
  }
});

//user login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log|(req.body)
  if ( !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const user = await User.findOne({ email });
  if (user   &&(await bcrypt.compare(password,user.password))) {
   const accesstoken=jwt.sign({
    user:{
      userName:user.userName,
      email:user.email,
      id:user.id,
    }
   },process.env.ACCESSTOKEN_SECERT ,{expiresIn:"50m"});
    res.status(200).json({accesstoken})
  }else{
    res.status(400);
    throw new Error("invalid password or email");
  }
});

//curent user
const currentUser = asyncHandler(async (req, res) => {
  res.json({ user: req.use });
});

module.exports = { registerUser, loginUser, currentUser };
