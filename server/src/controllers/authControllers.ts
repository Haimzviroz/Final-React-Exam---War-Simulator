import { Request, Response } from "express";
import { generateToken } from "../utils/auth";
import { createUser, findUserByName, } from "../service/dbServices";

// פונקציה להרשמה של משתמש חדש
export const register = async (req: Request, res: Response) => {
  try {
    const currentUser = req.body;

    const user = await createUser(currentUser);
    if (user) {
      res
        .status(201)
        .json(user._id);
    } else {
      res.status(400).json({ message: "could not add user" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("תקלה בהרשמה");
  }
};

export const login = async (req: any, res: any) => {
  const { username, password } = req.body;
  const user = await findUserByName(username);

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "שם משתמש או סיסמה שגויים" });
  }

  const token = generateToken(user.id, user.isIdf);
  res.status(201).json(user);
};
