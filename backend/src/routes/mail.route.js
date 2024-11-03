import express from "express";
import { sendMail } from "../controllers/MailControllers/sendMail.controller.js";

const mailRouter=express.Router();

mailRouter.post('/sendmail',sendMail)

export default mailRouter;