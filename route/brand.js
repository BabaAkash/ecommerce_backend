const express = require('express')
const router = express.Router()
const brandtController = require('../controller/Brand')
router.get('/',brandtController.fetchBrands)
router.post('/',brandtController.createBrand)
module.exports= router;