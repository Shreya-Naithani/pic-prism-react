import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

 const generateRefreshToken =(user)=>{
    return jwt.sign(user, process.env.SECRET_REFRESH_TOKEN, {expiresIn:'1d'});
}

export default generateRefreshToken;