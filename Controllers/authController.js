import User from "../Models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


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
            return res.status(400).json({success:false,message:"User not found "});
        }
       const pass = await bcrypt.compare(existingUser.password,password);
       if(!pass){
        return res.status(400).json({success:false,message:"Incorrect Password"});
       }

        return res.status(200).json({success:true,message:"Login successfully"})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:error.message});
    }
}