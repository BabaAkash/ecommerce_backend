const express = require('express')
const router = express.Router()
const productController = require('../controller/product')
router.post('/',productController.createProduct)
router.get('/',productController.fetchAllProduct)
router.get('/fetchProductById/:id',productController.fetchProductById)
router.patch('/updateProduct/:id',productController.updateProduct)
module.exports= router;

