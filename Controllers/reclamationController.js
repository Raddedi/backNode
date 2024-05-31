const Reclamation = require("../models/reclamation");

// Create a new reclamation
exports.createReclamation = async (req, res) => {
  try {
    const { achat, type, description } = req.body;
    const reclamation = new Reclamation({ achat, type, description ,dateReclamation : new Date()});
    await reclamation.save();
    res.status(201).json(reclamation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reclamations
exports.getAllReclamations = async (req, res) => {
    try {
      const reclamations = await Reclamation.find().populate({path: 'achat',
      populate: {
        path: 'user'
      }});
      res.json(reclamations);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
// Get a reclamation by ID
exports.getReclamation = async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id).populate("achat");
    if (!reclamation) {
      return res.status(404).json({ error: "Reclamation not found" });
    }
    res.json(reclamation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a reclamation by ID
exports.updateReclamation = async (req, res) => {
  try {
    const { type, description } = req.body;
    const reclamation = await Reclamation.findByIdAndUpdate(
      req.params.id,
      { type, description },
      { new: true, runValidators: true }
    );
    if (!reclamation) {
      return res.status(404).json({ error: "Reclamation not found" });
    }
    res.json(reclamation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a reclamation by ID
exports.deleteReclamation = async (req, res) => {
  try {
    const reclamation = await Reclamation.findByIdAndDelete(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ error: "Reclamation not found" });
    }
    res.json({ message: "Reclamation deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
