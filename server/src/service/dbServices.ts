import User, { IUser } from "../models/userModel";
import { ArmOrganization } from "../utils/ArmOrganization";

export const createUser = async (user: IUser): Promise<IUser | null> => {
  user.resources = [{ name: "", amount: 0 }]
  const userArmed = ArmOrganization(user);

  const newUser = await User.create(userArmed);
  return newUser;
};

export const findUserByName = async (
  username: string
): Promise<IUser | null> => {
  const user = await User.findOne({ username: username });
  return user;
};

