const mongoose = require("mongoose");
const { Schema } = mongoose;

const reclamationSchema = new Schema({
  achat: {
    type: Schema.Types.ObjectId,
    ref: "Achat"
  },
  type: { type: String},
  description: { type: String },
 dateReclamation: { type: Date, default: Date.now },
});

const Reclamation = mongoose.model("Reclamation", reclamationSchema);
module.exports = Reclamation;
