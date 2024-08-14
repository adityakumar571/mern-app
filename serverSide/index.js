const express= require("express")
const bodyParser=require("body-parser")
const dotenv =require("dotenv")
const Joy=require('joy')
const mongoDB=require("./Models/db.js")
const cors=require('cors')
const AuthRouter=require('./Routers/AuthRouter.js')
const ProductRouter=require('./Routers/ProductRouter.js')

const app=express();
dotenv.config();
const PORT =process.env.PORT||3000;


app.get('/ping',(req,res)=>{
    res.send("PONG");
})
app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);




app.listen(PORT,()=>{
    console.log(`Server is runing on port ${PORT}`);
})

