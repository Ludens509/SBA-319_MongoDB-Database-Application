import mongoose from 'mongoose';



    const commentSchema = new mongoose.Schema(
        {
            content: {
                type: String,
                required: true,
                maxlength: 1000, // limit comment length
            },
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // reference to User model
                required: true,
            },
            post: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post", // reference to Post (or Blog, Product, etc.)
                required: true,
            },
            likes: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User", // users who liked the comment
                },
            ],
            
           
        },
        { timestamps: true } // createdAt & updatedAt
    );



export default mongoose.model("Comment", commentSchema);