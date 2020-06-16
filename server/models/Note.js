import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

const Note = new Schema({
  content: { type: String, required: true },
  bugId: { type: ObjectId, ref: 'Bug', required: true },
  creatorEmail: { type: String, required: true }, //The provided name for who made the note
  flagged: { type: String, enum: ["pending", "completed", "rejected"] }
}, { timestamps: true });

Note.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default Note;
