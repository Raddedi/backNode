const express = require('express');
const multer = require('multer');
const path = require('path');
const Publication = require('../Models/publication');
const Boutique = require('../Models/boutique');

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les fichiers seront enregistrés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom du fichier
  }
});

const upload = multer({ storage: storage });

// Controller for creating a new publication
const createPublication = async (req, res) => {
  try {
    const { nomProduit, description, prix, type, boutiqueId } = req.body;
    const image = req.file ? req.file.path : null;

    const boutique = await Boutique.findById(boutiqueId);
    if (!boutique) {
      return res.status(404).json({ error: "Boutique not found" });
    }

    const newPublication = new Publication({ nomProduit, description, prix, type, boutique: boutiqueId, image });
    await newPublication.save();

    // Ajouter l'ID de la nouvelle publication à la liste des publications de la boutique
    boutique.publications.push(newPublication._id);
    await boutique.save();

    res.status(201).json({ message: "Publication created successfully", publication: newPublication });
  } catch (error) {
    res.status(500).json({ error: "Error creating publication", message: error.message });
  }
};


// Controller for retrieving all publications
const getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find().populate({
      path: "boutique",
      model: "Boutique",
    });;
    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving publications", message: error.message });
  }
};

// Controller for retrieving a single publication by ID
const getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id).populate("boutique");
    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving publication", message: error.message });
  }
};

const getPublicationByBoutique = async (req, res) => {
  try {
    const publication = await Publication.find({boutique:req.params.boutique});
    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving publication", message: error.message });
  }
};

// Controller for updating a publication by ID
const updatePublicationById = async (req, res) => {
  try {
    const { nomProduit, description, prix, type } = req.body;
    const {id} = req.params;
    const publication = await Publication.findById(id);
    console.log('id',)
    console.log('boutique',publication)
    if (!publication) {
      return res.status(404).json({ error: "Boutique not found" });
    }
    const updatedPublication = await Publication.findByIdAndUpdate(
      id,
      { nomProduit, description, prix, type },
      { new: true }
    );
    if (!updatedPublication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    res.status(200).json({ message: "Publication updated successfully", publication: updatedPublication });
  } catch (error) {
    res.status(500).json({ error: "Error updating publication", message: error.message });
  }
};

// Controller for deleting a publication by ID
const deletePublicationById = async (req, res) => {
  try {
    const deletedPublication = await Publication.findByIdAndDelete(req.params.id);
    if (!deletedPublication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    res.status(200).json({ message: "Publication deleted successfully", publication: deletedPublication });
  } catch (error) {
    res.status(500).json({ error: "Error deleting publication", message: error.message });
  }
};

module.exports = {
  createPublication,
  getAllPublications,
  getPublicationById,
  getPublicationByBoutique,
  updatePublicationById,
  deletePublicationById,
};
