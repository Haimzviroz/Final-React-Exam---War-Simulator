import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./dal/dal";
import authrouter from "./routes/authRoutes";
import userrouter from "./routes/userRoutes";
import candidateouter from "./routes/candidateRoute";
import cookieParser from "cookie-parser";
import cors from "cors"
import { createServer } from 'http';
import { Server } from 'socket.io';




dotenv.config();
const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.json());
app.use(cookieParser());
connectToDatabase();

app.use("/auth", authrouter);
app.use("/users", userrouter);
app.use("/admin", candidateouter);

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
