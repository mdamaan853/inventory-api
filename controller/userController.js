const jwt = require('jsonwebtoken')
const { hashSync, compareSync } = require('bcrypt')
const { createUser, getAllUser, getUserById, loginUser,getUserDashboard } = require('../service/userService')
const dotenv =require('dotenv')
dotenv.config()

module.exports = ({
    createUsers:async (req, res) => {
        console.log(req.body)
        if (req.body.password == req.body.cpassword){
            req.body.password = hashSync(req.body.password, 10)
            let data = await createUser(req.body) 
                if (!data) {
                    res.json({
                        success:false, 
                        msg:"Error in user create",
                    })
                } else {
                    res.json({
                        success:true,
                        msg: "successfully regestred",
                        result: data,
                    })
                }
        } else {
            res.json({
                success: false,
                msg: "Password did't match"
            })
        }
    },

    loginUsers: async (req, res) => {
       let user = await loginUser(req.body)
       if (!user) {
           res.json({  
               success: 0,
               msg: "you have not regestred yet"
            })
            } else {
                var result = compareSync(req.body.password, user.password)
                if (result) {
                    user = JSON.parse(JSON.stringify(user))
                    delete user.password
                    var token = jwt.sign({
                        email: user.email
                    },process.env.JWT_SECRET_KEY)
                    res.json({
                        success: true,
                        msg: "you are loggedin",
                        token: token,
                        result: user
                    })
                } else {
                    res.json({
                        success: false,
                        msg: 'invalid credentials'
                    })
                }
            }
    },
    getAllUsers: (req, res) => {
        getAllUser(req, (err, data) => {
            if (err) {
                res.json({
                    success: 0,
                    msg: err
                })
            } else {
                res.json({
                    success: 1,
                    result: data
                })
            }
        })
    },  
    getUserDashboards:async (req, res) => {
        try{

            let result =await getUserDashboard()
           if(result){
                res.json({
                    success: true,
                    result: result
                })
            }else{
                res.json({
                    success: false,
                    result: result
                })
            }
        }catch(err){
            console.log(err)
            res.json({
                success: false,
                result: err
            })
        }
    },  
    getUsersById: async (req, res) => {
        let user = await getUserById(req.params)
            
            if (!user) {
                res.json({
                    success: false,
                    msg: "no records found"
                })
            } else {
                user =JSON.parse(JSON.stringify(user))
                delete user.password
                res.json({
                    success: true,
                    result: user
                })
            }
    }
})