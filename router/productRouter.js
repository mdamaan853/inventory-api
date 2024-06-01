const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createProducts,getAllProducts,getProductsById,updateProducts,deleteProducts} = require('../controller/productController')
const auth =require('../middleware/auth')

const storage = multer.diskStorage({
    destination: './api/upload/product',
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + Date.now() + file.originalname)
    }
})
const upload = multer({ 
    storage: storage
})

router.post('/',upload.single('product_image'),auth,createProducts);

router.get('/',auth,getAllProducts);

router.get('/:id',auth,getProductsById);

router.put('/',upload.single('product_image'),auth,updateProducts);

router.delete('/:id',upload.none(),auth,deleteProducts);


module.exports = router; 