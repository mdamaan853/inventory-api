const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createOrders,getAllOrders,getOrdersById,updateOrders,OrderStockDeductions,deleteOrders,revertOrdersRawStock} = require('../controller/orderController')
const auth =require('../middleware/auth')

const storage = multer.diskStorage({
    destination: './upload/user',
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + Date.now() + file.originalname)
    }
})
const upload = multer({ 
    storage: storage
})

router.post('/', upload.none(),auth,createOrders);

router.get('/',auth,getAllOrders);

router.put('/stockdeduction',auth,OrderStockDeductions);

router.post('/revertstock',auth,revertOrdersRawStock);

router.get('/:id',auth,getOrdersById);

router.put('/',upload.none(),auth,updateOrders);

router.delete('/:id',upload.none(),auth,deleteOrders);


module.exports = router; 