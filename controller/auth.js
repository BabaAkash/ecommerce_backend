// Auth.js ==>   authorization login k time //login api hai je

const {User} = require('../model/user')
// for signup
exports.createUser =async (req, res)=>{
    try {
        const user =  new User(req.body)
        const response = await user.save()
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({msg:error})
    }
}

exports.loginUser =async (req, res)=>{
    
   try {
    const user = await User.findOne({email:req.body.email})
    
    if(!user){
        res.status(401).json({msg:"user not exist"})
    }
    else if(user.password === req.body.password){
        res.status(201).json({id:user.id, email:user.email, addresses:user.addresses})
    }else{
        res.status(400).json({unAuthorized:"password wrong"}, error)
    }
   } catch (error) {
    res.status(400).json({msg:"unAuthorized"}, error)
   }
  
}