import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  password: string;
  isIdf: boolean;
  location: string | null;
  name: string;
  resources: [{ name: string; amount: number }];
  comparePassword(userPassword: string): Promise<boolean>;
}

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  isIdf: {
    type: Boolean,

    default: false,
  },
  location: {
    type: String,
    default: null,
  },
  name: { type: String },
  resources: {
    type: [{ name: String, amount: Number }],
  },
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
UserSchema.index({ isIdf: 1 });

export default mongoose.model<IUser>("User", UserSchema);
