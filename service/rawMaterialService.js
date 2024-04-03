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
        gsm_product:req.gsm_product,
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
   // let rawMetrail=await rawModel.find({_id: { $in: req.rawid }})
   //  rawMetrail.map(async(rawdata)=>{
   //    rawdata.raw_stock.map((stock)=>{
   //       stock.stock_weight=stock.previous_stock_weight
   //       return  stock;
   //    })
   // })
   
   // return rawMetrail
   try {
      // Fetch raw materials
      let rawMaterials = await rawModel.find({ _id: { $in: req.rawid } });
      // Update stock_weight for each raw material
      rawMaterials.forEach(raw => {
          raw.raw_stock.forEach(stock => {
              stock.stock_weight = stock.previous_stock_weight;
          });
      });

      // Create bulk update operations
      const bulkOps = rawMaterials.map(raw => {
          return {
              updateOne: {
                  filter: { _id: raw._id },
                  update: raw
              }
          };
      });

      // Execute bulk update operations
      await rawModel.bulkWrite(bulkOps);

      return rawMaterials;
  } catch (error) {
      console.error("Error reverting raw material:", error);
      return error;
  }
},
deleteRawMetrail:async(req) => {
   return await rawModel.deleteOne({_id:req.id}).exec()
}

})