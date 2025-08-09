import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './Routes/authRoutes.js';
import jobRoutes from './Routes/jobRoutes.js';


const app=express()
 dotenv.config();

 const port=process.env.PORT || 8080;


app.use(express.json());
app.use(cookieParser());
 app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true
 }))


 app.use("/api/auth", authRoutes)
  app.use("/api/job", jobRoutes);

 app.get('/', (req, res) => {
   res.send('Welcome to the Job Portal API');
 });

 app.listen(port, ()=>{
    connectDB()
    console.log(`Server is running on port ${port}`);
 })
