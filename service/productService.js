const productModel = require('../model/productModal')
module.exports = ({
    createProduct: (req) => {
    return new productModel({ 
        product_name:req.product_name,
        product_sku:req.product_sku,
        product_category:req.product_category,
        product_width:req.product_width,
        product_length:req.product_length,
        raw_required:req.raw_required,
        repeat_width:req.repeat_width,
        Date:new Date(),
        }).save()
},

getAllProduct:async() => {
  return await productModel.find().lean().populate("product_category").exec()
},
getProductById:async(req) => {
   return await productModel.findOne({_id:req.id}).populate("product_category").exec()
},
updateProduct:async(req) => {
   return await productModel.updateOne({_id:req._id},{$set:req}).exec()
},
deleteProduct:async(req) => {
   return await productModel.deleteOne({_id:req.id}).exec()
}
})