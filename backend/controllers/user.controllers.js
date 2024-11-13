import { User } from "../models/user.Models.js";
import TryCatch from "../utils/tryCatch.js";
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js"

//Register User
export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user)
    return res.status(400).json({
      message: "User Already Exits",
    });

    const hashPassword=await bcrypt.hash(password,10);
    //create user
    user=await User.create({
        name,
        email,
        password:hashPassword,
    });
    generateToken(user._id,res)

    res.status(201).json({
        user,
        messageL:"User Registered Successfully"
    })

});

//Login User
export const loginUser = TryCatch(async (req, res) => {
  const {email,password}=req.body;
  const user=await User.findOne({email});
  if(!user)
    return res.status(400).json({
      message:"Invalid Email or Password"
    })
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch)
    return res.status(400).json({
      message:"Invalid Email or Password"
    })
  generateToken(user._id,res);
  res.status(200).json({
    user,
    message:"User Logged In Successfully"
  })

});

//My Profile
export const myProfile=TryCatch(async (req,res)=>{
  const user=await User.findById(req.user._id);
  res.json(user)
})
//Logout User
export const logoutUser=TryCatch(async (req,res)=>{
  res.cookie("token","",{
    maxAge:0,
  })
  res.json({
    message:"User Logged out Succesfully"
  })
})
