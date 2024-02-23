const userModel = require('../model/userModal')
const categoryModel = require('../model/categoryModal')
module.exports = ({
    checkEmail: async (req, res, next) => {
        try{ 
            let data = await userModel.find({email:req.body.email}).exec()
        if (data?.length > 0) {
            return res.json({
                success: false,
                msg: "Email id already registred"
            })
        }
        next()
        }
        catch(err){
            res.json({
                msg:"Error in check user",
                error:err
            })
        }
      
    },
    checkCategory: async (req, res, next) => {
        try{ 
            let data = await categoryModel.find({categoryName:req.body.categoryName}).exec()
        if (data?.length > 0) {
            return res.json({
                success: false,
                msg: "This Category already exists"
            })
        }
        next()
        }
        catch(err){
            res.json({
                msg:"Error in check user",
                error:err
            })
        }
      
    }
})