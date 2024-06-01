const {createProduct,getAllProduct,getProductById,updateProduct,deleteProduct} = require('../service/productService')
const {getRandomNumber} =require('../utils/generatorRandom')
module.exports = ({
    createProducts:async (req, res) => {
        try{
            console.log(req.body,req.file)
            if(req.file){
                req.body.product_image=req.file.path
            }if(req.body?.raw_required){
                req.body.raw_required=JSON.parse(req.body?.raw_required)
            }
            req.body.product_sku="SKU"+getRandomNumber(5)
            let data = await createProduct(req.body) 
            
            if (!data) {
                res.json({
                    success:false, 
                    msg:"Error in create product"
                })
            } else {
                res.json({
                    success:true,
                    msg: "product added",
                    result: data,
                })
            }
        }catch(err){
            console.log(err)
            res.json({
                success:false, 
                msg:"Error in create product",
                error:err
            })
        }
    },
    getAllProducts:async(req, res) => {
        try{
            let data=await getAllProduct()
           if(!data){
                res.json({
                    success: false,
                    result: data,
                    msg:"no product found"
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
    getProductsById: async (req, res) => {
        try{
            let data = await getProductById(req.params)
            
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
    updateProducts: async (req, res) => {
        try{
            if(req.file){
                req.body.product_image=req.file.path
            }if(req.body?.raw_required){
                req.body.raw_required=JSON.parse(req.body?.raw_required)
            }
            let data = await updateProduct(req.body)
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
    deleteProducts: async (req, res) => {
        try{
            let data = await deleteProduct(req.params)
            
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