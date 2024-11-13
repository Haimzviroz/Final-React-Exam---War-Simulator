import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./dal/dal";
import authrouter from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from "cors"




dotenv.config();
const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"*"
}))
connectToDatabase();

app.use("/auth", authrouter);
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('disconnect', (reason) => {
    console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
  });
});


const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  console.log('Server running on http://localhost:3000');
});
