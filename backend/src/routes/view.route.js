import express from "express";
import { getSinglePortfolio } from "../controllers/ViewControllers/getSinglePortfolio.controller.js";

const viewRouter=express.Router()

viewRouter.get("/getsingleuserportfolio/:_id",getSinglePortfolio);

export default viewRouter;