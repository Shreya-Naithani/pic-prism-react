import User from "../Models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import  generateRefreshToken  from "../Helpers/refreshToken.js";
import  generateAccessToken  from "../Helpers/accessToken.js";


//signup
export const signup = async(req,res)=>{
    try {
        const{username,email,password,accountType} = req.body;
      

        let existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({success:false,message:"User already present"});
        }
        let existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({success:false,message:"User already present"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        let user = new User({
            username,
            email,
            password:hashedPassword,
            accountType,
        })
        const userDetails = await user.save();
        return res.status(200).json({success:true,message:"User created successfully",userDetails})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:error.message});
    }
}

//login
export const login = async(req,res)=>{
    try {
        const{email,password}= req.body;
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(400).json({success:false,message:"User not found ,Please signup"});
        }
       const pass = await bcrypt.compare(password,existingUser.password);
       if(!pass){
        return res.status(400).json({success:false,message:"Invalid Credentials"});
       }
       const data = {
        id:existingUser._id,
        accountType:existingUser.accountType,
        author:existingUser.username
       };
       
       const accessToken = generateAccessToken(data);
       const refreshToken = generateRefreshToken(data);
      
        return res.status(200).json({success:true,
            message:"Login successfully",
            accessToken,
            refreshToken,
            role:existingUser.accountType,
            author:existingUser.username})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:error.message});
    }
}