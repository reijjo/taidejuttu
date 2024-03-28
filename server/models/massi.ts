import mongoose from "mongoose";

const rahaSchema = new mongoose.Schema({
  pvm: Date,
  mita: {
    type: String,
    required: [true, "Mita/mika?"],
  },
  info: String,
  hinta: {
    type: Number,
    required: [true, "Mita makso"],
  },
  tyyppi: {
    type: String,
    enum: ["Osto (- rahaa)", "Myynti (+ rahaa)"],
    required: [true, "osto/myynti?"],
  },
});

rahaSchema.set("toJSON", {
  transform: (_document, returnedRaha) => {
    returnedRaha.id = returnedRaha._id.toString();
    delete returnedRaha._id;
    delete returnedRaha.__v;
  },
});

const RahaModel = mongoose.model("Raha", rahaSchema);

export { RahaModel };
