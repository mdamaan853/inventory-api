const categoryModel = require('../model/categoryModal')
module.exports = ({
    createCategory: (req) => {
    return new categoryModel({ 
        categoryName:req.categoryName,
        categoryDescription:req.categoryDescription,
        type:req.type,
        Date:new Date(),
        }).save()
},

getAllCategory:async(condition) => {
  return await categoryModel.find(condition).lean().exec()
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