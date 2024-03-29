const mongoose = require('../db.config')
const orderschema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    customername: {
        type: String,
    },
    product_id: {
        type: String,
        required: true
    },
    order_id : {
        type: String,
        required:true
    },
    product_weight: {
        type: String,
        required: true,
    },
    status:{
        type:String,
    },
    order_type:{
        type:String,
    },
    raw_required: {
        type: Array,
    },
    Date:{
        type:Date,
    }
})
const ordermodel = mongoose.model('order', orderschema);
module.exports = ordermodel;