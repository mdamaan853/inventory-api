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
    raw_weight: {
        type: String,
        required: true
    },
    raw_length: {
        type: String,
        required: true
    },raw_stock:{
        type:Array
    },Date:{
        type:Date,
    }
})
const productmodel = mongoose.model('rawMetrial', rawschema);
module.exports = productmodel;