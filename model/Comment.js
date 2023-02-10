import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: String,
  author: String
});

const Comment = mongoose.model("comment", commentSchema);
export default Comment;