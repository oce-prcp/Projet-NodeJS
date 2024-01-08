const express = require('express')
const router = express.Router()
const moteurController = require('../controller/moteurController')
const middleware = require('../middleware/middleware')

router.post('/create', moteurController.create)
router.put('/update/:id', middleware.checkAdmin, moteurController.update)
router.get('/getAll', middleware.checkAdmin, moteurController.getAll)
router.get('/get/:id', middleware.checkAdmin, moteurController.moteurId)
router.delete('/delete/:id', middleware.checkAdmin, moteurController.delete)

module.exports = router