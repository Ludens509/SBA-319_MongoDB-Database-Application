import mongoose from "mongoose";

const mammalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, min: 0, required: true },
  habitat: {
    type: String,
    enum: {
      values: [
        "tropical",
        "desert",
        "domesticated",
        "prarie",
        "temperate",
        "polar",
        "aquatic",
      ],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
});

mammalSchema.index({ species: 1 });
mammalSchema.index({ habitat: 1 });

// //Create statics methods to get Avg age of all animals in the adptionCenter
// mammalSchema.statics.inhabit = function (habitat) {
//     return this.find({ habitat: habitat });
// };

// mammalSchema.methods.getOtherInHab = function (cb) {
//     return mongoose.model("Mammal".find({ habitat: this.habitat }))
// }
// //virtual Value
// mammalSchema.virtual("old").get(function () {
//     return this.age > 10;
// });

// //setting Virtual value
// mammalSchema.set("toJSON", { virtuals: true })
export default mongoose.model("Mammal", mammalSchema);