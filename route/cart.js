const express = require('express')
const router = express.Router()
const cartController = require('../controller/cart')

router.get('/',cartController.fetchCartByUser)
router.post('/',cartController.addToCart)
router.delete('/:id',cartController.deleteFromCart)
router.patch('/:id',cartController.updateCart)

module.exports= router;