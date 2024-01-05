const express = require('express');
const modeleController = require('../controllers/modeleController');

const router = express.Router();

router.get('/modeles', modeleController.getAllModeles);
router.get('/modeles/:id', modeleController.getModeleById);
router.post('/modeles', modeleController.createModele);
router.put('/modeles/:id/acheter', modeleController.acheterModele);



module.exports = router;