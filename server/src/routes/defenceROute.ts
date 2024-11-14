import express from "express";
import { getAllAttacks ,postInterception} from "../controllers/defenceController";
const defenceRoute = express.Router();

defenceRoute.get("/defence/:location" , getAllAttacks);
defenceRoute.get("/interception/:_id" , postInterception);

export default defenceRoute;
