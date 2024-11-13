import User, { IUser } from "../models/userModel";
import { Types } from "mongoose";
import { ArmOrganization } from "../utils/ArmOrganization";

export const createUser = async (user: IUser): Promise<IUser | null> => {
  const userArmed= ArmOrganization(user);
  
  const newUser = await User.create(userArmed);
  return newUser;
};








export const findUserByName = async (
  username: string
): Promise<IUser | null> => {
  const user = await User.findOne({ username: username });
  return user;
};

// export const getAllUsers = async (): Promise<IUser[] | null> => {
//   return await User.find().select("-password");
// };

// export const getAllCandidate = async (): Promise<ICandidate[] | null> => {
//     return await Candidate.find()
//   };

// export const updateVote = async (id: Types.ObjectId,votedfor: string): Promise<IUser | null> => {
//   const user = await User.findById(id);
//   if (user?.hasVoted) {
//     return null;
//   }

//   const candidate = await Candidate.findOneAndUpdate({name : votedfor} , {$inc: {votes : 1}},{new : true})
//   const userupdated = await User.findByIdAndUpdate(id, { votedfor: candidate?._id , hasVoted : true });

//   return userupdated
// };

// export const updateReverseVote = async (id: Types.ObjectId,votedfor: string): Promise<IUser | null> => {
//     const user = await User.findById(id);
//     if (!user?.hasVoted) {
//       return null;
//     }
//     const candidate = await Candidate.findOneAndUpdate({name : votedfor} , {$inc: {votes : -1}})
//     const userupdated = User.findByIdAndUpdate(id, { votedfor: null , hasVoted : false });
//     console.log("candidate" ,candidate);
//     return userupdated;
//   };
