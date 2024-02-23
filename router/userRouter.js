const express = require('express')
const router = express.Router()
const multer = require('multer')

const { createUsers,getAllUsers,getUsersById,loginUsers} = require('../controller/userController')
const {checkEmail} =require('../middleware/checkUniqueUser')

const storage = multer.diskStorage({
    destination: './upload/user',
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + Date.now() + file.originalname)
    }
})
const upload = multer({ 
    storage: storage
})

router.post('/register', upload.none(),checkEmail,createUsers);
    
router.post('/login',upload.none(),loginUsers);

router.get('/',getAllUsers);

router.get('/:id',getUsersById);



module.exports = router; 