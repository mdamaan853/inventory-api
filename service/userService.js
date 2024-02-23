const userModel = require('../model/userModal')
module.exports = ({
    createUser: (req) => {
    return new userModel({ 
        email:req.email,
        password:req.password,
        date:new Date(),
        }).save()
},
loginUser: async (req) => {
  return await userModel.findOne({email:req.email}).exec()
},
getAllUser: (req, res) => {
    userModel.find().exec((err, data) => {
        if (err){
            return res(err);
        }
        return res(null,data)
    })
},
getUserById:async(req) => {
   return await userModel.findOne({_id:req.id}).exec()
},

})