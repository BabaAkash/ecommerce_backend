// Auth.js ==>   authorization login k time //login api hai je
const crypto = require('crypto')
const JWT = require('jsonwebtoken')
const {User} = require('../model/user');
const { sanitizeUser } = require('../services/common');
// for signup
const SECRET_KEY = 'SECRET_KEY'
exports.createUser =async (req, res)=>{
  
    try {
        var salt = crypto.randomBytes(16);
       
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256',async function(err, hashedPassword) {

        const user =  new User({...req.body , password:hashedPassword,salt})
        const response = await user.save()
        req.login(sanitizeUser(response),(err)=>{
            if(err){
                res.status(400).json({msg:err})
            }else{
                const token = JWT.sign(sanitizeUser(response),SECRET_KEY)
                res.status(201).json(token)
            }
        })
    })
    } catch (error) {
        res.status(400).json({msg:error})
    }
}
// {id:response.id, role:response.role} = santizeuser(user) iski jagha likh diya
// exports.loginUser =async (req, res)=>{
    
// signup (create) k time par session bnana hai toh 
// req.login() karna padega
exports.loginUser =async (req, res)=>{
   
   
    res.json(req.user)
   
 }
 exports.checkUser =async (req, res)=>{
 
    res.json({status:"succes", user:req.user})
   
 }