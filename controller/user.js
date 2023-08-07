const { User } = require("../model/user")



exports.fetchUserById = async(req,res)=>{
    let id = req.params.id
    try {
        // projection use kiya hai ==> name email id show hoga only
        let User = await User.findById(id,'name email id').exec();
        res.status(200).json(User)

    } catch (error) {
        res.status(400).json({msg:error})
    }
}


exports.updateUser =async(req, res)=>{
    let id= req.params.id;
    try {
        const User = await User.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(User) 
    } catch (error) {
       res.status(400).json(error) 
    }
}