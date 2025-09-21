import express from "express";
import dotenv from "dotenv";
import globalErr from "./middleware/globalErr.mjs";
import log from "./middleware/logginMiddleware.mjs";
import connectDB from "./db/conn.mjs";
import mammalRoutes from "./routes/mammalRoutes.mjs";
import commentRoutes from "./routes/commentRoutes.mjs";
import userRoute from "./routes/userRoutes.mjs";
import postRoutes from "./routes/postsRoutes.mjs"
//Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

//DB connection
connectDB();


//Midddleware
app.use(express.json());
app.use(log);

//Routes
app.use("/api/mammal", mammalRoutes);
app.use("/users", userRoute);
app.use("/posts",postRoutes);
app.use("/comments",postRoutes);
// app.use("/api/ave", aveRoutes);

//global Middleware
app.use(globalErr);


app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
});