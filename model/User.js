import mongoose from "mongoose"
import isEmail from "validator/lib/isEmail.js";
import bcrypt from 'bcrypt'

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true , 'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail, 'Please a valid email']
    },
    password:{
        type:String,
        required:[true , 'Please enter a password'],
        minLength:[6 , 'Mininmum password length is 6 characters'],
    },
    
})


// fire a function after doc saved to db

// UserSchema.post('save',function (doc,next){
//     console.log('new user was created & saved' , doc)
//     next()
// })

// fire a function before doc saved to db
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next();
})

// static metgod to login user
UserSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})

    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error("Incorrect password")
    }
    throw Error("Incorrect email")

}

const User = mongoose.model("User",UserSchema)

export default User;