const express = require('express');
const dotenv = require('dotenv').config();
const port  = process.env.PORT;
const host = process.env.HOST;
const mongoose = require('mongoose');
const connectdb = require('./config/db.config')
const cors = require('cors');
const router = require('./routes/route');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectdb();
app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.use('/api/auth',router)

app.listen(port , host,()=>{
    console.log(`Server is running on port ${port} and host ${host}`);
})

