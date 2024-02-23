const dotenv =require('dotenv')
dotenv.config()

 const MONGO_URI=process.env.MONGO_URI;
 const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;
 const PORT=process.env.PORT;

 exports ={MONGO_URI,JWT_SECRET_KEY,PORT}; 