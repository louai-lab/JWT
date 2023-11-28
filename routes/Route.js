// const express = require('express')
// const bcrypt = require('bcrypt')
// const router=express.Router()
// const User = require('../model/User')
// const jwt=require("jsonwebtoken")

import express from 'express'
import bcrypt from 'bcrypt'
import User from '../model/User.js'
import jwt from 'jsonwebtoken'
import { signupGet , signupPost , loginGet , loginPost , logoutGet} from '../controllers/controller.js'

const router= express.Router()



router.get("/",(req,res)=>{
    res.json("i work fine")
})


router.get("/signup" , signupGet)


router.post("/signup", signupPost);


router.get("/login", loginGet)


router.post("/login", loginPost)

router.get('/logout',logoutGet)





export default router