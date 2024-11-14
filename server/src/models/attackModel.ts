import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAttack extends Document {
  name: string;
  status: string;
  sentFrom: string;
  sentTo: string;
  timeToHit: number;
}

const attackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  sentFrom: {
    type: String,
    required: true,
  },
  sentTo: {
    type: String,
    required: true,
  },
  timeToHit: {
    type: Number,
  },
});

export default mongoose.model<IAttack>("Attack", attackSchema);
