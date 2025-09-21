import mongoose from 'mongoose';
    const commentSchema = new mongoose.Schema(
        {
            content: {
                type: String,
                required: true,
                maxlength: 1000, // limit comment length
            },
            author: {
                type: String,
                required: true,
            },
            post: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post", // reference to Post (or Blog, Product, etc.)
                required: true,
            },
                   
        },
    );

export default mongoose.model("Comment", commentSchema);