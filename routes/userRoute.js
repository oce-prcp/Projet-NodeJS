const express = require('express');
const userController = require('../controller/userController')
const middleware = require('../middleware/middleware')
const router = express.Router();

router.get('/getAll', middleware.checkAdmin, userController.getAllUser)
router.get('/get/:id', middleware.checkAdmin, userController.userId)
router.post('/register', userController.register)
router.post('/login', userController.login)


module.exports = router