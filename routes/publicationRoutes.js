const express = require('express');
const router = express.Router();
const {
  createPublication,
  getAllPublications,
  getPublicationById,
  getPublicationByBoutique,
  updatePublicationById,
  deletePublicationById
} = require('../controllers/publicationController');


const multer = require('multer');

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les fichiers seront enregistrés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path?.extname(file.originalname)); // Nom du fichier
  }
});

const upload = multer({ storage: storage });


// POST /api/publications - Create a new publication
router.post('/', upload.single('image'),createPublication);

// GET /api/publications - Retrieve all publications
router.get('/', getAllPublications);

// GET /api/publications/:id - Retrieve a single publication by ID
router.get('/boutique/:boutique', getPublicationByBoutique);

router.get('/:id', getPublicationById);

// PUT /api/publications/:id - Update a publication by ID
router.put('/:id', updatePublicationById);

// DELETE /api/publications/:id - Delete a publication by ID
router.delete('/:id', deletePublicationById);

module.exports = router;
