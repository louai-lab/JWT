import express from 'express'
import User from '../model/User.js'
import jwt from 'jsonwebtoken'

// handle errors
const handleErrors = (err) =>{
    console.log(err.message , err.code)
    let errors = { email:'',password:''}

    // incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered'
    }

    // incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'that password is not correct'
    }

    // validation errors
    if(err.message.includes('user validation failed')){
        (Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message
        }))
    }

    return errors
}




const maxAge = 3 * 24 * 60 * 60 ;
const createtoken = (id) =>{
    return jwt.sign({id} ,'net ninja secret',{
        expiresIn:maxAge
    })
}




export const signupGet = async(req,res) =>{
    res.json('signup')
}






export const loginGet = async(req,res) =>{
    res.json('login')
}






export const signupPost = async(req,res) =>{
    const {email,password} = req.body

    try{
        const user = await User.create({email , password})
        const token = createtoken(user._id)
        res.cookie('jwt',token,{ httpOnly:true,maxAge:maxAge * 1000})
        res.status(201).json({user : user._id})
    }

    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}






export const loginPost = async(req,res) =>{

    const {email , password} = req.body

    try{
        const user = await User.login(email,password);
        res.status(200).json({user:user._id})
        console.log("log in")
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

export const logoutGet = async(req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    console.log('log out')
}

































// export const login = async(req,res)=>{
//     const user=await User.findOne({username:req.body.username})
    
//         if(user){
//             const validpassword=await bcrypt.compare(req.body.password,user.password)
//             if (!validpassword){
//                 res.json("Invalid password")
//             }
//             const token=await jwt.sign({username:user.username},process.env.SECRET_JWT)
//             res.cookie("jwt",token,{httpOnly:true,maxAge:24*60*60*1000})
//             res.json("Logged in")
//         }
// }


// export const register = async(req,res)=>{

//     const userexist=await User.findOne({username:req.body.username})
//     if(userexist){
//         res.json("User already exists")
//     }
//     else{
//         const password=await bcrypt.hash(req.body.password,10)
//         const user=new User({
//             username:req.body.username,
//             password:password
//         })
//         const userdata=await user.save()
//         res.send(userdata)
//     }

// }


// export const isauth = async(req,res)=>{
//     const cookie=await req.cookies.jwt
//     const claims=await jwt.verify(cookie,process.env.SECRET_JWT)

//     if(!claims) return res.json("not authenticated")

//     const user=await User.findOne({username:claims.username})
//     const {password,...data}=await user.toJSON()
//     res.json(data)
// }


// export const logout = async(req,res)=>{
//     res.cookie("jwt","",{maxAge:0})
//     res.json("Logged out")
// }