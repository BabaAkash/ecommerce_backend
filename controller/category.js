const { Category } = require("../model/category")



exports.fetchCategories = async(req,res)=>{
    try {
        let category = await Category.find({}).exec();
        res.status(200).json(category)

    } catch (error) {
        res.status(400).json({msg:error})
    }
}
exports.createCategory =async (req, res)=>{
    try {
        const category =  new Category(req.body)
        const response = await category.save()
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({msg:error})
    }
}