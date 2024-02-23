const categoryModel = require('../model/categoryModal')
module.exports = ({
    createCategory: (req) => {
    return new categoryModel({ 
        categoryName:req.categoryName,
        categoryDescription:req.categoryDescription,
        date:new Date(),
        }).save()
},

getAllCategory:async() => {
  return await categoryModel.find().lean().exec()
},
getCategoryById:async(req) => {
   return await categoryModel.findOne({_id:req.id}).exec()
},
updateCategory:async(req) => {
   return await categoryModel.updateOne({_id:req._id},{$set:req}).exec()
},
deleteCategory:async(req) => {
   return await categoryModel.deleteOne({_id:req.id}).exec()
}

})