const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../controller/auth')
router.post('/signup',authController.createUser)

router.post('/login',passport.authenticate('local'),authController.loginUser)
router.get('/check',passport.authenticate('jwt'),authController.checkUser)
module.exports= router;

