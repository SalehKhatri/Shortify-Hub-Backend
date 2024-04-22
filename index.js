const express=require('express');
const mongoose=require('mongoose');
const {connectToDB}=require('./connectToDB')
const urlRoute=require('./routes/url');
const userRoute=require("./routes/user")
const URL = require('./models/url');
const cors = require("cors");
require('dotenv').config()


const uri = process.env.DB_URL;
const app=express();
app.use(express.json())
app.use(cors());

const PORT=process.env.PORT || 3000;;

connectToDB(uri)
.then(console.log("Connected to mongodb!!!"));

app.listen(PORT, "0.0.0.0");

app.use('/',urlRoute);
app.use('/user',userRoute);
