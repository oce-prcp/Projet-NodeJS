const express = require('express');
const userController = require('../controller/userController')
const router = express.Router();

router.get('/getAll', userController.getAllUser)
router.get('/get/:id', userController.userId)
router.post('/register', userController.register)
router.post('/login', userController.login)


module.exports = router