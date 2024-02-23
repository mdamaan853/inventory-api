const {createCategory,getAllCategory,getCategoryById,updateCategory,deleteCategory} = require('../service/categoryService')

module.exports = ({
    createCategorys:async (req, res) => {
        try{
            let data = await createCategory(req.body) 
            
            if (!data) {
                res.json({
                    success:false, 
                    msg:"Error in create category"
                })
            } else {
                res.json({
                    success:true,
                    msg: "category added",
                    result: data,
                })
            }
        }catch(err){
            console.log(err)
            res.json({
                success:false, 
                msg:"Error in create category",
                error:err
            })
        }
    },

    getAllCategorys:async(req, res) => {
        try{
            let data=await getAllCategory()
           if(!data){
                res.json({
                    success: false,
                    result: data,
                    msg:"no category found"
                })
            }else{
                res.json({
                    success: true,
                    result: data
                })
            }
        }catch(err){
            res.json({
                success: false,
                result: err
            })
        }
    },  
    getCategorysById: async (req, res) => {
        try{
            let data = await getCategoryById(req.params)
            
            if (!data) {
                res.json({
                    success: false,
                    msg: "no records found"
                })
            } else {
                res.json({
                    success: true,
                    result: data
                })
            }
        }catch(err){
            res.json({
                success: false,
                err: err
            })
        }
        
    },
    updateCategorys: async (req, res) => {
        try{
            let data = await updateCategory(req.body)
            
            if (!data) {
                res.json({
                    success: false,
                    msg: "failed to update"
                })
            } else {
                res.json({
                    success: true,
                    result: data
                })
            }
        }catch(err){
            res.json({
                success: false,
                err: err
            })
        }
        
    },
    deleteCategorys: async (req, res) => {
        try{
            let data = await deleteCategory(req.params)
            
            if (!data) {
                res.json({
                    success: false,
                    msg: "failed to delete"
                })
            } else {
                res.json({
                    success: true,
                    result: data,
                    msg:"deleted"
                })
            }
        }catch(err){
            res.json({
                success: false,
                err: err
            })
        }
        
    }
})