import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username should be unique"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email should be unique"]
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    userInfo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"UserInfo"
    },
    refreshToken:{
        type:String,
        default:null
    }
},{
    timestamps:true
})
userSchema.pre("save",async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.comparePassword=async function(inputPassword){
    const result=await bcrypt.compare(inputPassword,this.password);
    return result;
}
userSchema.methods.generateRefreshToken=async function(){
    const refreshToken=jwt.sign({_id:this._id},process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1h' })
    this.refreshToken=refreshToken;
    return refreshToken;
}
userSchema.methods.generateAccessToken=async function(){
    const accessToken=jwt.sign({_id:this._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"10h"})
    return accessToken;
}

export const User=mongoose.model("User",userSchema);