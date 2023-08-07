const { Cart } = require("../model/cart")



exports.fetchCartByUser = async(req,res)=>{
  
    const user = req.query.user
    try {
        let cart = await Cart.find({user:user}).populate('user').populate('product');
        res.status(200).json(cart)

    } catch (error) {
        res.status(400).json({msg:error})
    }
}
exports.addToCart =async (req, res)=>{
   
    try {
        const cart =  new Cart(req.body)
        const response = await cart.save()
        const result =await response.populate('product')
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({msg:error})
    }
}
exports.deleteFromCart =async (req, res)=>{
   const id = req.params.id
    try {
        const doc = await Cart.findByIdAndDelete(id)
        res.status(200).json({msg:"success delete"})
    } catch (error) {
        res.status(400).json({msg:error})
    }
}
exports.updateCart =async(req, res)=>{
    let id= req.params.id;
    try {
        const cart = await Cart.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(cart) 
    } catch (error) {
       res.status(400).json(error) 
    }
}