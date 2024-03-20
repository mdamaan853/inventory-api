const {createRawMetrial,getAllRawMetrail,getRawMetrailById,getRawMetrailStock,updateRawMetrail,deleteRawMetrail} = require('../service/rawMaterialService')
const {getRandomNumber} =require('../utils/generatorRandom')
module.exports = ({
    createRawMetrials:async (req, res) => {
        try{
            req.body.raw_sku="SKU"+getRandomNumber(5)
            let data = await createRawMetrial(req.body) 
            
            if (!data) {
                res.json({
                    success:false, 
                    msg:"Error in create Raw Metrial"
                })
            } else {
                res.json({
                    success:true,
                    msg: "Raw Metrial added",
                    result: data,
                })
            }
        }catch(err){
            console.log(err)
            res.json({
                success:false, 
                msg:"Error in create Raw Metrial",
                error:err
            })
        }
    },

    getAllRawMetrails:async(req, res) => {
        try{
            let data=await getAllRawMetrail()
           if(!data){
                res.json({
                    success: false,
                    result: data,
                    msg:"no Raw Metrail found"
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
    getRawMetrailStocks:async(req, res) => {
        try{
            let data=await getRawMetrailStock()
           if(!data){
                res.json({
                    success: false,
                    result: data,
                    msg:"no Raw Metrail found"
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
    getRawMetrailsById: async (req, res) => {
        try{
            let data = await getRawMetrailById(req.params)
            
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
    updateRawMetrails: async (req, res) => {
        try{
            let data = await updateRawMetrail(req.body)
            
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
    deleteRawMetrails: async (req, res) => {
        try{
            let data = await deleteRawMetrail(req.params)
            
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