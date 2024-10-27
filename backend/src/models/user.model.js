import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"username is required"],
        // unique:[true,"username should be unique"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email should be unique"]
    },
    password:{
        type:String,
        require:true,
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
    if(!this.isModified("password")) return next();
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    return next();
})

userSchema.methods.comparePassword=async function(inputPassword){
    const result=await bcrypt.compare(inputPassword,this.password);
    return result;
}
// userSchema.methods.generateRefreshToken=async function(){
//     const refreshToken=jwt.sign({_id:this._id},process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '10h' })
//     this.refreshToken=refreshToken;
//     await this.save({ validateBeforeSave: false });
//     return refreshToken;
// }
userSchema.methods.generateAccessToken=async function(){
    const accessToken=jwt.sign({_id:this._id,email:this.email,userName:this.userName},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1000s"})
    return accessToken;
}

export const User=mongoose.model("User",userSchema);