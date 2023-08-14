const express = require('express')
const server = express()
const crypto = require('crypto')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const {User} = require('./model/user')
const {sanitizeUser,isAuth} = require('./services/common')

const productRouters = require('./route/product')
const categoryRoute = require('./route/category')
const brandRoute = require('./route/brand')
const userRoute = require('./route/user')
const authRoute = require('./route/auth')
const cartRoute = require('./route/cart')
const orderRoute = require('./route/order')
//JWT OPTION
const SECRET_KEY = 'SECRET_KEY'

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

//JWT


const mongoose = require('mongoose')
const cors = require('cors')
// Middleware
server.use(express.json())

server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
   
  }))
server.use(passport.authenticate('session'))

server.use(cors({
    exposedHeaders:['X-Total-Count']
}))


  


//All Router
server.use('/product',isAuth(),productRouters)

server.use('/categories',isAuth(),categoryRoute)
server.use('/brands',isAuth(),brandRoute)
server.use('/user',isAuth(),userRoute)
server.use('/auth',authRoute)
server.use('/cart',isAuth(),cartRoute)
server.use('/order',isAuth(),orderRoute)

// passport
// done (Middleware) next funciton ko call krta hai
passport.use('local',
  new LocalStrategy(
  async  function(username, password, done) {
        // email ke through hi user ko find karynge
       
        try {
            const user = await User.findOne({email:username})
           
            if(!user){   
                done(null , false,{message:"Invalid creddential"})
            }
            console.log(user.salt)
            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256',async function(err, hashedPassword){
             
              if (!crypto.timingSafeEqual(user.password, hashedPassword)){
                return done(null , false,{message:"Invalid creddential"})
               }
               const token = JWT.sign(sanitizeUser(user),SECRET_KEY)
            done(null, token)
            })
            
           } catch (error) {
            console.log("error:",error)
           done(error)
           }
    }
  ));

  passport.use('jwt',new JwtStrategy(opts,async function(jwt_payload, done) {
    console.log("jwt_payload,",jwt_payload)
    try {
      const user =  await User.findOne({id: jwt_payload.sub})
      if(user){
        return done(null, sanitizeUser(user))
        }else{
          return done(null, false)
        }
    } catch (error) {
     return done(error, false)
    }
     
 
}));
  // create session variable req.user
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      console.log("sereialziser",user)
      return cb(null, {id:user.id, role:user.role})
    });
  });
  // request authorzied mein user ko populate karne k kaam aata hai
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      console.log("DE-sereialziser",user)
      return cb(null, user);
    });
  });
// Database MongoDb
main().catch(err=>console.log(err))
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');
    console.log("database connected")
}


server.listen(8080, ()=>{
    console.log("server is running")
})