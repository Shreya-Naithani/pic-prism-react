import jwt from 'jsonwebtoken';

export const verifyToken = async(req,res,next)=>{
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(" ")[1]; 
    console.log(token);
    if(!token){
        return res.status(401).json({success:false,message:"Invalid token"});
    }
    try {
        jwt.verify(token , process.env.SECRET_ACCESS_TOKEN,(err,user)=>{
         if(err){
            return res.status(403).json({success:false,message:"Forbidden"});
         }
         else{
            req.id = user.id;
            req.author = user.author;
            req.accountType = user.accountType;

            next();
         }
        })
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
  
}