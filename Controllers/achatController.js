const Achat = require('../models/achat');

// Create a new Achat
exports.createAchat = async (req, res) => {
  try {
    const { publicationId, userId } = req.body;

    // Validate publication and user existence
    if (!publicationId || !userId) {
      return res.status(400).json({ message: 'Publication ID and User ID are required' });
    }

    const newAchat = new Achat({
      publication: publicationId,
      user: userId,
      achatDate: new Date()
    });

    const savedAchat = await newAchat.save();
    res.status(201).json(savedAchat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Achats
exports.getAllAchats = async (req, res) => {
  try {
    const achats = await Achat.find().populate('publication user');
    res.status(200).json(achats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Achat by ID
exports.getAchatById = async (req, res) => {
  try {
    const achat = await Achat.findById(req.params.id).populate('publication user');
    if (!achat) {
      return res.status(404).json({ message: 'Achat not found' });
    }
    res.status(200).json(achat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAchatByUser = async (req, res) => {
    try {
      const achat = await Achat.find({user:req.params.user}).populate('publication').populate('user');
      if (!achat) {
        return res.status(404).json({ message: 'Achat not found' });
      }
      res.status(200).json(achat);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Update an Achat
exports.updateAchat = async (req, res) => {
  try {
    const { publicationId, userId, achatDate } = req.body;

    const updatedAchat = await Achat.findByIdAndUpdate(
      req.params.id,
      { publication: publicationId, user: userId, achatDate },
      { new: true }
    ).populate('publication user');

    if (!updatedAchat) {
      return res.status(404).json({ message: 'Achat not found' });
    }

    res.status(200).json(updatedAchat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an Achat
exports.deleteAchat = async (req, res) => {
  try {
    const deletedAchat = await Achat.findByIdAndDelete(req.params.id);
    if (!deletedAchat) {
      return res.status(404).json({ message: 'Achat not found' });
    }
    res.status(200).json({ message: 'Achat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
