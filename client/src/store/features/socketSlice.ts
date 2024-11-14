// import { useState, useEffect } from "react";
// import { io, Socket } from "socket.io-client";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useSocket } from "../../socet/socet";

// const SERVER_URL = "http://localhost:3000";
// interface socketState {
//   socket: Socket | null;
//   connected: boolean;
//   status: string | null;
//   rocket: string | null;
// }
// export const attacksocketSlice = createAsyncThunk(
//   "attack/post",
//   async (attack: { name: string; location: string; rocket: string }) => {
//     console.log("attack", attack);
//     const { socket, connected } = useSocket();
//     if (!socket) return;
//     const res = await socket?.emit("attack", { attack }, (response: string) => {
//       console.log(response);
//       return response;
//     });

//     return res;
//   }
// );

// export const defencesocketSlice = createAsyncThunk(
//   "defence/post",
//   async (defence: { status: string }) => {
//     const { socket, connected } = useSocket();
//     if (!socket) return;
//     const res = await socket?.emit(
//       "defence",
//       { defence },
//       (response: string) => {
//         console.log(response);
//         return response;
//       }
//     );
//     return res;
//   }
// );

// export const joinRoom = createAsyncThunk(
//   "joinRoom/post",
//   async (join: { location: string; name: string }) => {
//     const { socket, connected } = useSocket();
//     if (!socket) return;
//     const res = await socket?.emit("joinRoom", { join }, (response: string) => {
//       console.log(response);
//       return response;
//     });
//     return res;
//   }
// );

// export const socketSlice = createSlice({
//   name: "socket",
//   initialState: {
//     socket: null,
//     connected: false,
//     status: "idle",
//     rocket: null,
//   } as socketState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(attacksocketSlice.pending, (state, action) => {
//         state.status = "launched";
//       })
//       .addCase(attacksocketSlice.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//       })
//       .addCase(attacksocketSlice.rejected, (state, action) => {
//         state.status = "failed";
//       })

//       .addCase(joinRoom.pending, (state, action) => {
//         state.status = "launched";
//       })
//       .addCase(joinRoom.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//       })
//       .addCase(joinRoom.rejected, (state, action) => {
//         state.status = "failed";
//       })

//       .addCase(defencesocketSlice.pending, (state, action) => {
//         state.status = "launched";
//       })
//       .addCase(defencesocketSlice.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//       })
//       .addCase(defencesocketSlice.rejected, (state, action) => {
//         state.status = "failed";
//       });
//   },
// });

// export default socketSlice.reducer;
