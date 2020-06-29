import mongoose from "mongoose";
const Schema = mongoose.Schema;
let objectId = Schema.Types.ObjectId

var Bug = new Schema({
  closed: { type: Boolean, required: true, default: false },
  description: { type: String, required: true },
  title: { type: String, required: true },
  creatorEmail: { type: String, required: true }, //The provided name for who reported the bug
  closedDate: { type: Date}
}, { timestamps: true } 
);

Bug.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});



export default Bug;
