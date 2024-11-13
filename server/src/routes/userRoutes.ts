import express from "express";
import { vote, unvote, getUsers } from "../controllers/userController";
import { authMiddleware,managerAuthMiddleware} from "../utils/authMiddleware";
const voterouter = express.Router();

voterouter.post("/vote", authMiddleware, vote);
voterouter.post("/unvote", authMiddleware, unvote);
voterouter.get("/getUsers",authMiddleware , managerAuthMiddleware, getUsers);

export default voterouter;
