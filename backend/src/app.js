import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import viewRouter from "./routes/view.route.js"
import mailRouter from "./routes/mail.route.js";
import errHandlerMiddleware from "./middlewares/err.middleware.js";
import notfountMiddleware from "./middlewares/notfound.middleware.js";

const app=express();
app.use(cookieParser())
app.use(cors({
    origin : process.env.CORS_URL,
    credentials : true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/user",userRouter)
app.use("/view",viewRouter)
app.use("/mail",mailRouter)

app.use(errHandlerMiddleware)
app.use(notfountMiddleware)
export default app;