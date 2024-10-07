
const notfountMiddleware=(req,res)=>{
    return res.status(404).json({success:false,result:{message:"Route not found"}});
}
export default notfountMiddleware;