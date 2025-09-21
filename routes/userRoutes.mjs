import express from "express";
import User from "../models/userSchema.mjs"

import { users } from "../data/data.mjs";

const router = express.Router();



router.get("/seed", async (req, res) => {
  try {
    await User.deleteMany({}); // Optional just to clear out database before reloading new data

    await User.insertMany(users);

    res.send("Data Successfully seeded");
  } catch (err) {
    console.error(err.msg);
  }
});
router.route("/")
.post( async(req,res)=>{
   try {
    //Action
     let newUser = await User.create(req.body);
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
        let getAllUsers = await User.find({});
        //Return
        res.json(getAllUsers);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:`❌ Error - ${err.message} `});
    }
})
export default router;