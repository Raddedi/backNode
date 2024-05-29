const mongoose = require("mongoose");
const { Schema } = mongoose;

const boutiqueSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  publications: [{ type: Schema.Types.ObjectId, ref: 'Publication' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Boutique = mongoose.model("Boutique", boutiqueSchema);
module.exports = Boutique;
