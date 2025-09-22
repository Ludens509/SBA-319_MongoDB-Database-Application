import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: {
            values: [
                "user",
                "admin",
            ],
            default: "user"
        }
    },
});


userSchema.index({email:1});
userSchema.index({username:1});


export default mongoose.model("User", userSchema);