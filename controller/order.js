const { Order } = require("../model/order")



exports.fetchOrderByUser = async(req,res)=>{
  
    const user = req.query.user
    try {
        let Order = await Order.find({user:user})
        res.status(200).json(Order)

    } catch (error) {
        res.status(400).json({msg:error})
    }
}
exports.createOrder =async (req, res)=>{
   
    try {
        const Order =  new Order(req.body)
        const response = await Order.save()
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({msg:error})
    }
}
exports.deleteOrder =async (req, res)=>{
   const id = req.params.id
    try {
        const doc = await Order.findByIdAndDelete(id)
        res.status(200).json({msg:"success delete"})
    } catch (error) {
        res.status(400).json({msg:error})
    }
}
exports.updateOrder =async(req, res)=>{
    let id= req.params.id;
    try {
        const Order = await Order.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(Order) 
    } catch (error) {
       res.status(400).json(error) 
    }
}