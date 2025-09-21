import express from "express";
import postSchema from "../models/postSchema.mjs";

const router = express.Router();

router.route("/")
.post(async(req,res)=>{
    try{
        //Action
        let newPost = await postSchema.create(req.body);
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
        let getAllPosts = await postSchema.find({});
        //Return
        res.json(getAllPosts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:`❌ Error - ${err.message} `});
    }
})

export default router;