const express = require('express');
const router = express.Router()
const voitureController = require('../controller/voitureController');

router.get('/getAll', voitureController.getAllVoitures);
router.get('/get/:id', voitureController.getVoitureById);
router.post('/create', voitureController.createVoiture);
router.put('/acheter/:id', voitureController.acheterVoiture);
router.put('/addOption/:id', voitureController.add);
router.put('/removeOption/:id', voitureController.removeOption);


module.exports = router;