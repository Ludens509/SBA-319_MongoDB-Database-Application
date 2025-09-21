import express from "express";
import Mammal from "../models/mammalSchema.mjs";
const router = express.Router();
// import { mammals } from "../data/data.mjs";

// router.get("/seed", async (req, res) => {
//   try {
//     await Mammal.deleteMany({}); // Optional just to clear out database before reloading new data

//     await Mammal.insertMany(mammals);

//     res.send("Data Successfully seeded");
//   } catch (err) {
//     console.error(err.msg);
//   }
// });

// Get animals by habitat
// router.get("/habitat/:hab", async (req, res) => {
//   let result = await Mammal.inHabitat(req.params.hab);

//   res.json(result);
// });

// // Get animals with a similar habitat
// router.get("/eco/:id", async (req, res) => {
//   try {
//     let animal = await Mammal.findById(req.params.id);

//     let result = await animal.getOthersInHab();

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: `❌ Error - ${err.message}` });
//   }
// });

// Create
router
  .route("/")
  .post(async (req, res) => {
    console.log(req.body);
    try {
      // Perform Action
      let newMammal = await Mammal.create(req.body);

      // Return Response
      res.json(newMammal);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}` });
    }
  })
  // Read
  .get(async(req, res) => {
    try {
      let allMammals = await Mammal.find({});

      res.json(allMammals);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}` });
    }
    // res.send("testing");
  });

// Update
router
  .route("/:id")
  .put(async (req, res) => {
    try {
      let updatedMammal = await Mammal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json(updatedMammal);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}` });
    }
  })
//   // Deleted
  .delete(async (req, res) => {
    try {
      let deleteMammal = await Mammal.findByIdAndDelete(req.params.id);

      res.json(deleteMammal);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}` });
    }
  });

export default router;