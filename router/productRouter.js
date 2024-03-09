const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createProducts,getAllProducts,getProductsById,updateProducts,deleteProducts} = require('../controller/productController')
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

router.post('/', upload.none(),auth,createProducts);

router.get('/',auth,getAllProducts);

router.get('/:id',auth,getProductsById);

router.put('/',upload.none(),auth,updateProducts);

router.delete('/:id',upload.none(),auth,deleteProducts);


module.exports = router; 