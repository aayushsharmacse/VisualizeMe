
import {createResponse} from "../../utils/responseGenerator.util.js";
import { createError } from "../../utils/errorGenerator.util.js";
import { UserInfo } from "../../models/userInfo.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import sendMyMail from "../../utils/mailing.util.js";

const sendMail=asyncHandler(async(req,res)=>{
    const mail=req.body;
    // if mail has name,contact,message than it came from /help/contact 
    //else if 
    //the mail has name,email,message,portfolio then it is from viewportfolio
    // console.log("entered sendmail with mail",mail);
    if(mail.portfolio){
        const {email}=await UserInfo.findById(mail.portfolio);
        if(!email){
            return next(createError(400,"Email not found","Err from backend in sendmail api controller"))
        }
        mail.to=email;
    }
    await sendMyMail(mail);
    return createResponse(res,{success:true});

})

export {sendMail};