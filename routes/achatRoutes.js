const express = require("express");
const router = express.Router();
const achatController = require("../controllers/achatController");
const authMiddleware = require("../middleware/authMiddleware");
// Create a new Achat
router.post("/", achatController.createAchat);

// Get all Achats
router.get("/", achatController.getAllAchats);

router.get("/user/:user", achatController.getAchatByUser);
// Get a single Achat by ID
router.get("/:id", achatController.getAchatById);

// Update an Achat
router.put("/:id", achatController.updateAchat);

// Delete an Achat
router.delete("/:id", achatController.deleteAchat);

module.exports = router;
