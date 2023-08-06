const express = require('express')
const router = express.Router()
const categoryController = require('../controller/category')
router.get('/',categoryController.fetchCategories)
router.post('/',categoryController.createCategory)
module.exports= router;