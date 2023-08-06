const { Brand } = require("../model/brand")



exports.fetchBrands = async(req,res)=>{
    try {
        let brands = await Brand.find({}).exec();
        res.status(200).json(brands)

    } catch (error) {
        res.status(400).json({msg:error})
    }
}
exports.createBrand =async (req, res)=>{
    try {
        const brand =  new Brand(req.body)
        const response = await brand.save()
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({msg:error})
    }
}