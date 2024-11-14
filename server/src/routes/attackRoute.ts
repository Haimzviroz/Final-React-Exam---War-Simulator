import express from "express";
import { sendAttack} from "../controllers/attackController";
const attackRoute = express.Router();

attackRoute.post("/attack/:id" , sendAttack);

export default attackRoute;
