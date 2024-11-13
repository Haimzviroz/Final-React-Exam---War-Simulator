import express from "express";
import { register ,login} from "../controllers/authControllers";
const authrouter = express.Router();

authrouter.post("/register" , register);
authrouter.post("/login" ,login);

export default authrouter;
