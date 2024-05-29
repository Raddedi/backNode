const Boutique = require("../Models/boutique.js");

// Controller for creating a new boutique
const createBoutique = async (req, res) => {
  try {
    const { name, phoneNumber, address, email,user } = req.body;
    const newBoutique = new Boutique({
      name,
      phoneNumber,
      address,
      email,
    user
    });
    await newBoutique.save();
    res.status(201).json({
      message: "Boutique created successfully",
      boutique: newBoutique,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating boutique", message: error.message });
  }
};

// Controller for retrieving all boutiques
const getAllBoutiques = async (req, res) => {
  try {
    const boutiques = await Boutique.find().populate({
      path: "publications",
      model: "Publication",
    });
    res.status(200).json(boutiques);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving boutiques", message: error.message });
  }
};

const getAllBoutiquesByUser = async (req, res) => {
  try {
    const boutiques = await Boutique.find({user : req.params.user})
    
    res.status(200).json(boutiques);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving boutiques", message: error.message });
  }
};

// Controller for retrieving a single boutique by ID
const getBoutiqueById = async (req, res) => {
  try {
    const boutique = await Boutique.findById(req.params.id).populate({
      path: "publications",
      model: "Publication",
    });
    if (!boutique) {
      return res.status(404).json({ error: "Boutique not found" });
    }
    res.status(200).json(boutique);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving boutique", message: error.message });
  }
};

// Controller for updating a boutique by ID
const updateBoutiqueById = async (req, res) => {
  try {
    const { name, phoneNumber, address, email } = req.body;
    const updatedBoutique = await Boutique.findByIdAndUpdate(
      req.params.id,
      { name, phoneNumber, address, email },
      { new: true }
    );
    if (!updatedBoutique) {
      return res.status(404).json({ error: "Boutique not found" });
    }
    res.status(200).json({
      message: "Boutique updated successfully",
      boutique: updatedBoutique,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating boutique", message: error.message });
  }
};

// Controller for deleting a boutique by ID
const deleteBoutiqueById = async (req, res) => {
  try {
    const deletedBoutique = await Boutique.findByIdAndDelete(req.params.id);
    if (!deletedBoutique) {
      return res.status(404).json({ error: "Boutique not found" });
    }
    res.status(200).json({
      message: "Boutique deleted successfully",
      boutique: deletedBoutique,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting boutique", message: error.message });
  }
};

module.exports = {
  createBoutique,
  getAllBoutiques,
  getAllBoutiquesByUser,
  getBoutiqueById,
  updateBoutiqueById,
  deleteBoutiqueById,
};
