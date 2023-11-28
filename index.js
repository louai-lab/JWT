import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Routes from './routes/Route.js';
import cookieParser from 'cookie-parser';

dotenv.config();


const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(Routes)

mongoose.connect(process.env.DB_URI).then((r)=>{
    console.log("Connected to DB")
}).catch((e)=>{
    console.log(e)
})


// cookies
app.get('/set-cookies',(req,res) =>{

    // res.setHeader('Set-Cookie', 'newUser=true');

    res.cookie('newUser',false)
    res.cookie('isEmployee',true,{maxAge:1000 * 60 * 60 * 24 , httpOnly:true});

    res.send('you got the cookies');

})

// app.get("*",checkUser)


app.get('/read-cookies',(req,res) =>{

    const cookies = req.cookies
    console.log(cookies.newUser)

    res.json(cookies)
    
})


app.listen(3000,()=>{
    console.log("server running on port 3000");
})