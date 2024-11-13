import jwt from "jsonwebtoken";

export const generateToken = (_id: string, isAdmin: boolean): string => {
  return jwt.sign({ _id, isAdmin }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};
