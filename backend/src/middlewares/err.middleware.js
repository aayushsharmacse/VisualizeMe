import { CustomAPIError } from "../utils/errorGenerator.util.js";
const errHandlerMiddleware=(err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({success:false, result: {message:err.message,loc:err.loc} });
    }
    console.log("Error not thrown by api");
    console.log(err);
    return res.status(501).json({success:false,result:{message:"Error not thrown by api"}});
}
export default errHandlerMiddleware;