const express = require("express");
const dotEnv=require('dotenv');
const mongoose=require('mongoose');
const vendorRoutes=require('./routes/vendorRoutes')
const productRoutes=require('./routes/productRoutes');
const bodyParser=require('body-parser');
const firmRoutes=require('./routes/firmRoutes');
const path=require('path')
const cors=require('cors');

const app=express()
app.use(cors({
    origin: 'http://localhost:5173'
}));

const PORT=process.env.PORT || 4001;
dotEnv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB connected successfully!"))
.catch((error)=>console.log(error))

app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes)
app.use('/product',productRoutes);
app.use('./uploads',express.static('uploads'));

app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`);
}); 
app.use('/',(req,res)=>{
    res.send("<h1>Welcome to suby");
})