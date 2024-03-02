const mongoose = require('../db.config')
const categoryschema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryDescription: {
        type: String
    },
    type: {
        type: String,
        required:true
    },
    date: {
        type: Date
    }
})
const categorymodel = mongoose.model('category', categoryschema);
module.exports = categorymodel;