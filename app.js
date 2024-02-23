const express = require('express');
const bodyParser=require('body-parser')
const app = express()
const cors = require('cors');

const userRouter = require('./router/userRouter')
const categoryRouter = require('./router/categoryRouter')

const PORT=process.env.PORT || 4000


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

app.use("/api/user",userRouter);
app.use("/api/category",categoryRouter);

app.get('/ping',(req,res)=>{
res.send('server is on')
});

// var server = app.listen(PORT, () => {
//     console.log(`HTTPS Server running on port ${PORT}`);
// });


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });