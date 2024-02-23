const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.Promise = global.Promise;
const promise=mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
promise.then(function(db) {
    console.log("Connected to database!!!");
}, function(err){
    console.log("Error in connecting database " + err);
});

module.exports=mongoose