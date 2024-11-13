import express from "express";
import { getCandidates } from "../controllers/candidateController";
import { authMiddleware,managerAuthMiddleware } from "../utils/authMiddleware";
const candidateouter = express.Router();

candidateouter.get("/candidates",authMiddleware , getCandidates);


export default candidateouter;
