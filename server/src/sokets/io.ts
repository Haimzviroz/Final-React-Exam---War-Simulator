import { Socket } from "socket.io";
import { io } from "../app";


import {getUser , addUser, removeUser, getUsersInRoom} from "../usersConnected";

export const handleSocketConnection = (socket: Socket) => {
  console.log(`[socket.io] New Connection ${socket.id}`);

  socket.on("join", (join : {name: string , location: string }) => {
      
  })
  socket.on('disconnect', () => {
    console.log("Bye bye client");
  });

  // Listen for attackLaunched event
  socket.on('attackLaunched', (data) => {
    io.emit('attackLaunched', data);
  });

  // Listen for missileIntercepted event
  socket.on('missileIntercepted', (data) => {
    io.emit('missileIntercepted', data);
  });
  socket.on('attackHit', (data) =>{
    io.emit('attackHit', data)
  })
};