import express from "express";
import commentSchema from "../models/commentSchema.mjs";

const router = express.Router();

router.route("/")
.post( async(req,res)=>{
   try {
    //Action
     let newComment = await commentSchema.create(req.body);
     //Return
     res.json(newComment);
   } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: `❌ Error - ${err.message} `});
   }
})

.get(async(req,res)=>{
    try {
        //Action
        let getAllComments = await commentSchema.find({});
        //Return
        res.json(getAllComments);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:`❌ Error - ${err.message} `});
    }
})
export default router;