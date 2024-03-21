const express = require('express')
const router = express.Router()
const multer = require('multer')

const { createUsers,getAllUsers,getUsersById,loginUsers,getUserDashboards,updateUsers,deleteUsers} = require('../controller/userController')
const {checkEmail} =require('../middleware/checkUniqueUser')
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

router.post('/register', upload.none(),checkEmail,createUsers);
    
router.post('/login',upload.none(),loginUsers);

router.get('/dashboard',auth,getUserDashboards);

router.get('/',auth,getAllUsers);

router.get('/:id',auth,getUsersById);

router.put('/',upload.none(),auth,updateUsers);

router.delete('/:id',auth,deleteUsers);



module.exports = router; 