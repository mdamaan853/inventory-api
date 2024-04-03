const mongoose = require('../db.config')
const rawschema = new mongoose.Schema({
    raw_name: {
        type: String,
        required: true
    },
    raw_sku: {
        type: String,
        required:true
    },
    raw_category: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:"category"
    },
    raw_gauge: {
        type: String,
        required: true
    },
    gsm_product: {
        type: Number
    },
    raw_length: {
        type: String,
        required: true
    },raw_stock:{
        type:Array
    },raw_gsm:{
        type:String
    },
    quantity_alert:{
        type:Number
    },
    Date:{
        type:Date,
    }
})
const productmodel = mongoose.model('rawMetrial', rawschema);
module.exports = productmodel;