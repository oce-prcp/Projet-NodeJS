const express = require('express')
const router = express.Router()
const moteurController = require('../controller/moteurController')

router.post('/create', moteurController.create)
router.put('/update/:id', moteurController.update)
router.get('/getAll', moteurController.getAll)
router.get('/get/:id', moteurController.moteurId)

module.exports = router