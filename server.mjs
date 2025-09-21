import express from "express";
import dotenv from "dotenv";
import globalErr from "./middleware/globalErr.mjs";
import log from "./middleware/logginMiddleware.mjs";
import connectDB from "./db/conn.mjs";
import mammalRoutes from "./routes/mammalRoutes.mjs";
import commentRoutes from "./routes/commentRoutes.mjs";
import postRoutes from "./routes/postsRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import methodOverride from 'method-override';
import { templateEngineHandler } from "./engineTemplate/templateEngine.mjs";

//Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

//DB connection
connectDB();


//Midddleware
app.use(express.json());
app.use(log);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// serve static files from the styles directory
app.use(express.static("./styles"));
app.use(express.static("./script"));


// define the template engine
templateEngineHandler(app);

//Routes
app.use("/api/mammal", mammalRoutes);
app.use("/users", userRoutes);
app.use("/posts",postRoutes);
app.use("/comments",commentRoutes);
// app.use("/api/ave", aveRoutes);

//global Middleware
app.use(globalErr);


app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
});