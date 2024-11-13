import { Request, Response } from "express";
import {
  updateVote,
  updateReverseVote,
  getAllUsers,getAllCandidate
} from "../service/dbServices";
import { AuthRequest } from "../utils/authMiddleware";
import {io} from '../app'

export const vote = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const {votedFor}  = req.body;
    if (!userId) return;
    const user = await updateVote(userId, votedFor);
    if (!user) {
      res.status(401).json({ message: "You have already voted" });
    } else {
      res.status(201).json(user);
    // console.log(votedFor , "a");
      io.emit("voteUpdate" , ()=>{
       return  getAllCandidate()
      })

    }
  } catch (error) {
    res.status(400).json("תקלה בהרשמה");
  }
};

export const unvote = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { votedFor } = req.body;
    if (!userId) return;
    const user = await updateReverseVote(userId, votedFor);
    res.status(201).json(user);
    
  } catch (error) {
    console.log(error);
    
    res.status(400).json("תקלה בהרשמה");
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json("תקלה בהרשמה");
  }
};
