const mongoose = require('../db.config')
const productchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_sku: {
        type: String,
        required:true
    },
    product_category: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:"category"
    },
    product_width: {
        type: String,
    },
    product_length: {
        type: String,
    },
    raw_required:{
        type:Array
    },
    Date:{
        type:Date,
    }
})
const productmodel = mongoose.model('product', productchema);
module.exports = productmodel;