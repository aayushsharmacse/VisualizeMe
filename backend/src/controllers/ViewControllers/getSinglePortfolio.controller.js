
import {createResponse} from "../../utils/responseGenerator.util.js";
import { UserInfo } from "../../models/userInfo.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";

const getSinglePortfolio=asyncHandler(async (req,res)=>{
    const userInfo=await UserInfo.findById(req.params._id);
    return createResponse(res,{userInfo:userInfo});
})

export {getSinglePortfolio};