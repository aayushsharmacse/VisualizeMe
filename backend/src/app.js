import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import errHandlerMiddleware from "./middlewares/err.middleware.js";
import notfountMiddleware from "./middlewares/notfound.middleware.js";
// import userRouter from "./routes/userinfo.routes.js";
// import userRouter from "./routes/user.routes.js";

const app=express();
app.use(cors({
    origin : process.env.CORS_URL,
    credentials : true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/user",userRouter)


app.use(errHandlerMiddleware)
app.use(notfountMiddleware)
export default app;