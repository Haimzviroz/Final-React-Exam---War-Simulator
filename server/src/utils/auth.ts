import jwt from "jsonwebtoken";

export const generateToken = (_id: string, isIdf: boolean): string => {
  return jwt.sign({ _id, isIdf }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};
