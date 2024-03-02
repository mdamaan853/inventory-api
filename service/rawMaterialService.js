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
        date:new Date(),
        }).save()
},

getAllRawMetrail:async() => {
  return await rawModel.find().lean().populate("raw_category").exec()
},
getRawMetrailById:async(req) => {
   return await rawModel.findOne({_id:req.id}).populate("raw_category").exec()
},
updateRawMetrail:async(req) => {
   return await rawModel.updateOne({_id:req._id},{$set:req}).exec()
},
deleteRawMetrail:async(req) => {
   return await rawModel.deleteOne({_id:req.id}).exec()
}

})