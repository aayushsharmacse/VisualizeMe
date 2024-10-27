import mongoose from "mongoose";
const bulletSchema=new mongoose.Schema({
    bulletDisplayImage:{
        imageURI:{
            type:String,
        },
        dimensionX:{
            type:String,
        },
        dimensionY:{
            type:String,
        }
    },
    bulletHeader:{
        type:String
    },
    bulletHeaderURI:{
        type:String
    },
    bulletText:{
        type:String
    }
}, {timestamps:true});


const sectionSchema=new mongoose.Schema({
    sectionHeader:{
        type:String,
    },
    bullets:[
        {
            type:bulletSchema
        }
    ]
}, {timestamps:true});

const userInfoSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String,
    },
    profileImage:{
        imageURI:{
            type:String,
        },
        dimensionX:{
            type:String,
        },
        dimensionY:{
            type:String,
        }
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
            type:sectionSchema
        }
    ]

}, {timestamps:true})

export const UserInfo=mongoose.model("UserInfo",userInfoSchema);