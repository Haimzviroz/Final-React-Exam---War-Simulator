import { Request, Response } from "express";
import { getAllCandidate } from "../service/dbServices";

export const getCandidates = async (req: Request, res: Response) => {
  try {
    const allCandidate = await getAllCandidate();
    res.json(allCandidate);
  } catch (error) {
    res.status(400).json("תקלה בהרשמה");
  }
};
