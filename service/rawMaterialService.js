const rawModel = require('../model/rawMetrialModel')
module.exports = ({
    createRawMetrial: (req) => {
    return new rawModel({ 
        raw_name:req.raw_name,
        raw_sku:req.raw_sku,
        raw_category:req.raw_category,
        raw_gauge:req.raw_gauge,
        raw_weight:req.raw_weight,
        raw_length:req.raw_length,
        raw_stock:req.raw_stock,
        raw_gsm:req.raw_gsm,
        quantity_alert:req.quantity_alert,
        Date:new Date(),
        }).save()
},

getAllRawMetrail:async() => {
  return await rawModel.find().lean().populate("raw_category").exec()
},

getRawMetrailStock:async() => {
   let itemOutStock = await  rawModel.find({$or:[{"raw_stock.stock_weight": { $lte: 0 }},{"raw_stock.stock_weight":{$exists:true}}]}).exec()
   // let itemOutStock = await  rawModel.find({"raw_stock.stock_weight": { $lte: 0 }}).countDocuments().exec()
   let itemInStock = await  rawModel.find({"raw_stock.stock_weight": { $gt: 0 }}).exec()
  return {itemOutStock ,itemInStock}
},
getRawMetrailById:async(req,select={}) => {
   return await rawModel.findOne({_id:req.id}).populate("raw_category").select(select).exec()
},
updateRawMetrail:async(req) => {
   return await rawModel.updateOne({_id:req._id},{$set:req}).exec()
},
revertRawMetrail:async(req) => {
   return await rawModel.update(
      { _id: { $in: req.rawid } },
      { $set: { 'raw_stock.$[].stock_weight': '$raw_stock.$[].previous_stock_weight'} },
      {multi: true}
   ).exec()
},
deleteRawMetrail:async(req) => {
   return await rawModel.deleteOne({_id:req.id}).exec()
}

})