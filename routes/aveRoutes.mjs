import express from 'express';
import Avian  from "../models/commentSchema.mjs";
const router = express.Router();


//CREATE
// router.route("/")


router.route("/:id")
//READ
.get(async (req,res)=>{
    try {
        //perform action
        let allAvian = await Avian.find({});
        //return
        res.json(allAvian);
    } catch (error) {
        
    }
})
.post(async(req,res)=>{
    try {
        //perform Action
        let newAvian = await  Avian.create(req.body);
        //return
        res.json(newAvian);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: `Error - ${err.message}`})
    }
});


//READ
//@ GET /:id
//@ get element by specific IS

router.route('/:id').get(async(req,res)=>{
    let getAvian = await Avian.findById(req.params.id);
    res.json(getAvian); 
})


//UPDATE
.put(async(req,res)=>{
   try{ 
    let updateAvian = await Avian.findByIdAndUpdate(req.params.id, req.body, {new:true });

    res.json(updateAvian);
   }catch(err){
    
   }
}).delete(async(req,res)=>{
    let deleteAvian = await Avian.findByIdAndDelete(req.params.id )
    if(!deleteAvian) res.json({msg: "err doesn't exist"});
    else res.json(deleteAvian);
})
export default router;