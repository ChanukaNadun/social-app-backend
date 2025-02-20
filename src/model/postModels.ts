//postModels.ts
import mongoose, { Schema, Document } from "mongoose";

interface IPost extends Document {
  title: string;
  body: string;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

export default mongoose.model<IPost>("Post", PostSchema);
