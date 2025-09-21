import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
   
  
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // references commentSchema
      },
    ],
   
  });

  export default mongoose.model("Post", postSchema);