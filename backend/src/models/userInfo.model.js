import mongoose from "mongoose";
import Section from "./section.model";

const userInfoSchema=new mongoose.Schema({
    profileImage:{
        type:String
    },
    profileImageCaption:{
        type:String,
        default:"Hey there 👋"
    },
    profileImageSubCaption:{
        type:String
    },
    sections:[
        {
            type:Section
        }
    ]

}, {timestamps:true})

export const UserInfo=mongoose.model("UserInfo",userInfoSchema);