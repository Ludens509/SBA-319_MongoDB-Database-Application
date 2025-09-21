import express from "express";
import userSchema from "../models/UserSchema.mjs";

const router = express.Router();

router.route("/")
.post( async(req,res)=>{
   try {
    //Action
     let newUser = await userSchema.create(req.body);
     //Return
     res.json(newUser);
   } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: `❌ Error - ${err.message} `});
   }
})

.get(async(req,res)=>{
    try {
        //Action
        let getAllUsers = await userSchema.find({});
        //Return
        res.json(getAllUsers);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:`❌ Error - ${err.message} `});
    }
})
export default router;