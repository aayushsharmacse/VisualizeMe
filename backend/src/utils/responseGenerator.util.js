
const createResponse=(res,data,statusCode=200)=>{
    return res.status(statusCode).json({success:true,result:data});
}
export {createResponse};