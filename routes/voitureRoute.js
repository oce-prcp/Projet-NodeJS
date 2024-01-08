const express = require('express');
const router = express.Router()
const voitureController = require('../controller/voitureController');
const middleware = require('../middleware/middleware')

router.get('/getAll', voitureController.getAllVoitures);
router.get('/get/:id', voitureController.getVoitureById);
router.post('/create', middleware.checkAdmin, voitureController.createVoiture);
router.put('/edit/:id', middleware.checkAdmin, voitureController.editVoiture);
router.delete('/delete/:id', middleware.authenticator, voitureController.deleteVoiture);
router.put('/acheter/:id', middleware.authenticator, voitureController.acheterVoiture);
router.put('/addOption/:id', middleware.authenticator, voitureController.add);
router.put('/removeOption/:id', middleware.authenticator, voitureController.removeOption);
router.get('/historique', middleware.checkComptable, voitureController.historiqueAchatsParMois)


module.exports = router;