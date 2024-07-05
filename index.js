import express from 'express';
import dotenv from 'dotenv';
import connectDb from './connection.js';
// import authRoute from './Routes/authRoutes.js';
import path from 'path';
import {readdirSync} from 'fs';


dotenv.config();
 const app = express();

 const port = process.env.PORT || 3000;

 // Making routes
app.get('/',(req,res)=>{
    res.json("hello");
})

// app.use('/api',authRoute);

// importing and using routes dynamically
readdirSync('./Routes').forEach(async (route) => {
    const routePath = path.join('./Routes', route);
    const normalizedPath = routePath.replace(/\\/g, '/'); // Normalize path
  
    try {
      const routeModule = await import("./"+ normalizedPath); // Use normalized path
      app.use('/api', routeModule.default || routeModule); // Use exported function
    //   console.log('default route modules',routeModule.default)
    //   console.log(' route modules',routeModule)
    } catch (error) {
      console.error(`Error importing route module '${normalizedPath}':`, error);
    }
  });
// console.log(readdirSync('./Routes'))

//databse connection
connectDb();

 app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
 }
    
 )