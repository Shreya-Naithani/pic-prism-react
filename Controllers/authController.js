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


export const refresh = async(req,res)=>{
const authHeader = req.headers["Authorization"];
const token =  authHeader && authHeader.split(" ")[1];
if(!token){
    return res.status(404).json({success:false,message:"Please Login"})
}
try {
    jwt.verify(token , process.env.SECRET_REFRESH_TOKEN ,(err,user)=>{
        if(err){
             return res.status(403).json({success:false,message:err.message})
            }
        const accessToken = generateAccessToken({
        id:user.id,
        accountType:user.accountType,
        author:user.author
    })
    const refreshToken = generateRefreshToken({
        id:user.id,
        accountType:user.accountType,
        author:user.author
    })
    return res.status(200).json({success:true,message:"Token refreshed Successfully",accessToken,
        refreshToken,
        role:user.accountType,
    author:user.author});
    })
} catch (error) {
    return res.status(500).json({success:false,message:error.message})
}
}

export const switchProfile = async(req,res)=>{
    const authorId = req.id;
    const authorAccountType = req.accountType;
    try {
        const user = await User.findByIdAndUpdate(authorId,{
            accountType : authorAccountType === "seller" ? "buyer" : "seller"
        })
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
      
        const data ={
            id :user._id,
            accountType : user.accountType,
            author :user.username
        }
 
        const accessToken = generateAccessToken(data);
        const refreshToken = generateRefreshToken(data);
        return res.status(200).json({success:true,message:`Switched to ${user.accountType}`,
        accessToken,
        refreshToken,
        role:user.accountType,
        author:user.username,
        })
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    } 

}