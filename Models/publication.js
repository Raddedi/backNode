const mongoose = require("mongoose");
const { Schema } = mongoose;

const publicationSchema = new Schema({
  nomProduit: { type: String, required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
  type: { type: String, required: true },
  datePublication: { type: Date, default: Date.now }, // Ajout du champ datePublication de type Date avec une valeur par défaut de la date actuelle
  boutique: { type: Schema.Types.ObjectId, ref: 'Boutique' },
  image: { type: String }
});

const Publication = mongoose.model("Publication", publicationSchema);
module.exports = Publication;
