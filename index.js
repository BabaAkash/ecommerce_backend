const express = require('express')
const server = express()
const productRouters = require('./route/product')
const categoryRoute = require('./route/category')
const brandRoute = require('./route/brand')
const userRoute = require('./route/user')
const authRoute = require('./route/auth')
const cartRoute = require('./route/cart')
const orderRoute = require('./route/order')
const mongoose = require('mongoose')
const cors = require('cors')
// Middleware
server.use(express.json())
server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
//All Router
server.use(productRouters)

server.use('/categories',categoryRoute)
server.use('/brands',brandRoute)
server.use('/user',userRoute)
server.use('/auth',authRoute)
server.use('/cart',cartRoute)
server.use('/order',orderRoute)
// Database MongoDb
main().catch(err=>console.log(err))
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');
    console.log("database connected")
}

server.listen(8080, ()=>{
    console.log("server is running")
})