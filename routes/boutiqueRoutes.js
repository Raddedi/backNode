const express = require('express');
const router = express.Router();
const {
  createBoutique,
  getAllBoutiques,
  getBoutiqueById,
  getAllBoutiquesByUser,
  updateBoutiqueById,
  deleteBoutiqueById
} = require('../controllers/boutiqueController');

// POST /api/boutiques - Create a new boutique
router.post('/', createBoutique);

// GET /api/boutiques - Retrieve all boutiques
router.get('/', getAllBoutiques);

router.get('/user/:user', getAllBoutiquesByUser);
// GET /api/boutiques/:id - Retrieve a single boutique by ID
router.get('/:id', getBoutiqueById);

// PUT /api/boutiques/:id - Update a boutique by ID
router.put('/:id', updateBoutiqueById);

// DELETE /api/boutiques/:id - Delete a boutique by ID
router.delete('/:id', deleteBoutiqueById);

module.exports = router;
