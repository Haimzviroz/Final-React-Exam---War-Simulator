import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./dal/dal";
import authrouter from "./routes/authRoutes";
import defenceRoute from "./routes/defenceROute";
import attackRoute from "./routes/attackRoute";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);
connectToDatabase();

app.use("/auth", authrouter);
app.use("/defence", defenceRoute);
app.use("/attack", attackRoute);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});
