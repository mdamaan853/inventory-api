const express = require('express')
const router = express.Router()
const multer = require('multer')

const {createRawMetrials,getAllRawMetrails,getRawMetrailsById,updateRawMetrails,deleteRawMetrails} = require('../controller/rawMetrailController')
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

router.post('/', upload.none(),auth,createRawMetrials);

router.get('/',auth,getAllRawMetrails);

router.get('/:id',auth,getRawMetrailsById);

router.put('/',upload.none(),auth,updateRawMetrails);

router.delete('/:id',upload.none(),auth,deleteRawMetrails);


module.exports = router; 