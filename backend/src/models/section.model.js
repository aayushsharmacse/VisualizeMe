import mongoose from "mongoose";

const bulletSchema=new mongoose.Schema({
    bulletDisplayImage:{
        type:String
    },
    bulletHeader:{
        type:String
    },
    bulletHeaderURL:{
        type:String
    },
    bulletText:{
        type:string
    }
}, {timestamps:true})

const Bullet=mongoose.model("Bullet",bulletSchema);

const sectionSchema=new mongoose.Schema({
    sectionHeader:{
        type:String,
    },
    bullets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Bullet"
        }
    ]
}, {timestamps:true})

export const Section=mongoose.model("Section",sectionSchema);