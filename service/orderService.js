const orderModel = require('../model/orderModel')
const rawModel = require('../model/rawMetrialModel')
module.exports = ({
    createOrder: (req) => {
    return new orderModel({ 
        product_name:req.product_name,
        product_id:req.product_id,
        order_id:req.order_id,
        product_weight:req.product_weight,
        raw_required:req.raw_required,
        status:"Not Started",
        order_type:req.order_type,
        customername:req.customername,
        Date:new Date(),
        }).save()
},

getAllOrder:async(condition) => {
  return await orderModel.find(condition).lean().exec()
},
getOrderById:async(req) => {
   return await orderModel.findOne({_id:req.id}).exec()
},
updateOrder:async(req) => {
   return await orderModel.updateOne({_id:req._id},{$set:req}).exec()
},
OrderStockDeduction:async(req) => {
   return await rawModel.updateOne({_id:req._id},{$set:req}).exec()
},
deleteOrder:async(req) => {
   return await orderModel.deleteOne({_id:req.id}).exec()
}
})