const userModel = require('../model/userModal')
const orderModel = require('../model/orderModel')
const productModel = require('../model/productModal')
const rawMetrailModel = require('../model/rawMetrialModel')
module.exports = ({
    createUser: (req) => {
    return new userModel({ 
        email:req.email,
        password:req.password,
        username:req.username,
        date:new Date(),
        }).save()
},
loginUser: async (req) => {
  return await userModel.findOne({email:req.email}).exec()
},
getAllUser: (req, res) => {
    return userModel.find({}).exec()
},
getUserDashboard:async(req, res) => {
    let orderCount = await orderModel.find().countDocuments().exec()
    let rawMetrailCount = await rawMetrailModel.find().countDocuments().exec()
    let productCount = await productModel.find().countDocuments().exec()
    let OrderProcessing = await orderModel.find({status:"Processing"}).exec()
    let result={productCount,rawMetrailCount,orderCount,OrderProcessing}
    return result
}, 
getUserById:async(req) => {
   return await userModel.findOne({_id:req.id}).exec()
},
updateUser:async(req) => {
    return await userModel.updateOne({_id:req._id},{$set:req}).exec()
 },
 deleteUser:async(req) => {
    return await userModel.deleteOne({_id:req.id}).exec()
 }

})