const mongoose = require("mongoose");
const { Schema } = mongoose;

const achatSchema = new Schema({
  publication: {
    type: Schema.Types.ObjectId,
    ref: "Publication",
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  achatDate: { type: Date, default: Date.now },
});

const Achat = mongoose.model("Achat", achatSchema);
module.exports = Achat;
