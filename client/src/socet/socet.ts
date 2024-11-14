import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3000";
// interface IRespurces {
//   name:string,
//   amount:number
// }
 


export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  // const [respurces, setRespurces] = useState<IRespurces[]>();

  useEffect(() => {
    const socketInstance = io(SERVER_URL);
    setSocket(socketInstance);
    setConnected(true);
    socket?.on("voteUpdate", (vote) => {
      console.log(vote);
      
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, connected };
}
