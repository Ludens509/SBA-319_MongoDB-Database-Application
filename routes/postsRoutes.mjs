import express from "express";
import Post from "../models/postSchema.mjs";
import { posts } from "../data/data.mjs";

const router = express.Router();



router.get("/seed", async (req, res) => {
  try {
    await Post.deleteMany({}); // Optional just to clear out database before reloading new data

    await Post.insertMany(posts);

    res.send("Data Successfully seeded");
  } catch (err) {
    console.error(err.msg);
  }
});


router.route("/")
.post(async(req,res)=>{
    try{
        //Action
        let newPost = await Post.create(req.body);
        //Return
        res.json(newPost);
    }catch(err){
        console.log(err.message);
        res.status(500).json({msg:`❌ Error - ${err.message}`});
    }
})
.get(async(req,res)=>{
    try {
        //Action
        let getAllPosts = await Post.find({});
        //Return
        res.json(getAllPosts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:`❌ Error - ${err.message} `});
    }
})

export default router;