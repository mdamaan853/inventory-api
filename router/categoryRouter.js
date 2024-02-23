const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createCategorys,getAllCategorys,getCategorysById,updateCategorys,deleteCategorys} = require('../controller/categoryController')
const auth =require('../middleware/auth')
const {checkCategory} =require('../middleware/checkUniqueUser')

const storage = multer.diskStorage({
    destination: './upload/user',
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + Date.now() + file.originalname)
    }
})
const upload = multer({ 
    storage: storage
})

router.post('/', upload.none(),auth,checkCategory,createCategorys);

router.get('/',auth,getAllCategorys);

router.get('/:id',auth,getCategorysById);

router.put('/',upload.none(),updateCategorys);

router.delete('/:id',upload.none(),deleteCategorys);



module.exports = router; 