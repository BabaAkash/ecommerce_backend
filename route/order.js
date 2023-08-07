const express = require('express')
const router = express.Router()
const OrderController = require('../controller/order')

router.get('/',OrderController.fetchOrderByUser)
router.post('/',OrderController.createOrder)
router.delete('/:id',OrderController.deleteOrder)
router.patch('/:id',OrderController.updateOrder)

module.exports= router;