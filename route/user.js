const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
router.get('/:id',UserController.fetchUserById)
router.patch('/:id',UserController.updateUser)
module.exports= router;