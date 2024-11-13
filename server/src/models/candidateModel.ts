import mongoose, { Schema, Document } from "mongoose";

export interface ICandidate extends Document {
  name: string;
  image: string;
  votes: number;
}

const CandidateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  votes: {
    votes: { type: Number, default: 0 }  
  },
});

export default mongoose.model<ICandidate>("Candidate", CandidateSchema);
