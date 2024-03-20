const userModel = require('../model/userModal')
const orderModel = require('../model/orderModel')
const productModel = require('../model/productModal')
const rawMetrailModel = require('../model/rawMetrialModel')
module.exports = ({
    createUser: (req) => {
    return new userModel({ 
        email:req.email,
        password:req.password,
        date:new Date(),
        }).save()
},
loginUser: async (req) => {
  return await userModel.findOne({email:req.email}).exec()
},
getAllUser: (req, res) => {
    userModel.find().exec((err, data) => {
        if (err){
            return res(err);
        }
        return res(null,data)
    })
},
getUserDashboard:async(req, res) => {
    let orderCount = await orderModel.find().countDocuments().exec()
    let rawMetrailCount = await rawMetrailModel.find().countDocuments().exec()
    let productCount = await productModel.find().countDocuments().exec()
    let OrderProcessing = await productModel.find({status:"Processing"}).exec()
    let itemOutStock = await  rawMetrailModel.find({"raw_stock.stock_weight": { $gt: 0 }}).exec()
    let itemInStock = await  rawMetrailModel.find({"raw_stock.stock_weight": { $lt: 0 }}).exec()
    let result={orderCount,rawMetrailCount,productCount,OrderProcessing,itemOutStock,itemInStock}
    console.log(result)
    return result
}, 
getUserById:async(req) => {
   return await userModel.findOne({_id:req.id}).exec()
},

})