import { CustomAPIError } from "../utils/errorGenerator.util.js";
const errHandlerMiddleware=(err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        console.log("found err of custom err")
        console.log({success:false, result: {message:err.message,loc:err.loc}})
        return res.status(err.statusCode).json({success:false, result: {message:err.message,loc:err.loc} });
    }
    console.log("Error not thrown by api");
    console.log(err);
    return res.status(501).json({success:false,result:{message:"Error not thrown by api directly"}});
}
export default errHandlerMiddleware;