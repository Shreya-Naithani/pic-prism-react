import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const connectDb =async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
      console.log("Database connected successfully")
    }).catch((err)=>{
        console.log(err);
        console.log('Database disconnected');
    })
}


export default connectDb;