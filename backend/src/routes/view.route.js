import express from "express";
import { getSinglePortfolio,getPortfoliosForView } from "../controllers/ViewControllers/getSinglePortfolio.controller.js";

const viewRouter=express.Router()

viewRouter.get("/getsingleuserportfolio/:_id",getSinglePortfolio);
viewRouter.get("/getportfoliosforview",getPortfoliosForView);
export default viewRouter;