const express = require("express");
const router = express.Router();
const reclamationController = require("../controllers/reclamationController");

// Create a new reclamation
router.post("/", reclamationController.createReclamation);

router.get("/", reclamationController.getAllReclamations);

// Get a reclamation by ID
router.get("/:id", reclamationController.getReclamation);



// Update a reclamation by ID
router.put("/:id", reclamationController.updateReclamation);

// Delete a reclamation by ID
router.delete("/:id", reclamationController.deleteReclamation);

module.exports = router;
