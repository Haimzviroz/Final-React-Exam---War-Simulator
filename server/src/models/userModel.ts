import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  password: string;
  isAdmin: boolean
  hasVoted: boolean;
  votedfor: null | Types.ObjectId;
  comparePassword(userPassword: string): Promise<boolean>;
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,

    default: false,
  },
  hasVoted: {
    type: Boolean,
    default: false,
  },

  votedfor: { type: Schema.Types.ObjectId, ref: "candidate", default: null },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

UserSchema.index({ username: 1 });
UserSchema.index({ isAdmin: 1 });

export default mongoose.model<IUser>("User", UserSchema);
