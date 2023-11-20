import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

type TypeNote = InferSchemaType<typeof noteSchema>;

export default model<TypeNote>('Notes',noteSchema);