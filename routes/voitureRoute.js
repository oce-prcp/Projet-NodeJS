const express = require('express');
const router = express.Router()
const voitureController = require('../controller/voitureController');

router.get('/voiture', voitureController.getAllVoitures);
router.get('/voiture/:id', voitureController.getVoitureById);
router.post('/create', voitureController.createVoiture);
router.put('/voiture/:id/acheter', voitureController.acheterVoiture);


module.exports = router;