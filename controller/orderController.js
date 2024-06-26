const {createOrder,getAllOrder,getOrderById,updateOrder,OrderStockDeduction,deleteOrder} = require('../service/orderService')
const {updateRawMetrail,revertRawMetrail} = require('../service/rawMaterialService')
const orderid = require('order-id')('hdhdj');
module.exports = ({
    createOrders:async (req, res) => {
        try{
            
            req.body.order_id="ORD"+"-"+orderid.generate();
            let data = await createOrder(req.body) 
            
            if (!data) {
                res.json({
                    success:false, 
                    msg:"Error in create order"
                })
            } else {
                res.json({
                    success:true,
                    msg: "order added",
                    result: data,
                })
            }
        }catch(err){
            console.log(err)
            res.json({
                success:false, 
                msg:"Error in create order",
                error:err
            })
        }
    },
    getAllOrders:async(req, res) => {
        try{
            let condition={}
            if (req.query) {
            console.log(req.query)
                condition=req.query
            }
            let data=await getAllOrder(condition)
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
    getOrdersById: async (req, res) => {
        try{
            let data = await getOrderById(req.params)
            
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
    updateOrders: async (req, res) => {
        try{
            console.log(req.body)
            let data = await updateOrder(req.body)
            console.log(data)
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
    revertOrdersRawStock: async (req, res) => {
        try{
            console.log(req.body)
            let data = await revertRawMetrail(req.body)
            console.log(data)
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
    OrderStockDeductions: async (req, res) => {
        try{
            let stkData=req.body.stockData;
            let data=null;
            for(let raw in stkData) {
                console.log(stkData[raw])
                console.log(raw)
                if(raw){
                    let reqdata={_id:raw,raw_stock:stkData[raw]}
                    data = await updateRawMetrail(reqdata)
                }
            }
            if (!data) {
                res.json({
                    success: false,
                    msg: "failed to update",
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
    deleteOrders: async (req, res) => {
        try{
            let data = await deleteOrder(req.params)
            
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