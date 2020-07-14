const express=require('express');
const bodyParser = require('body-parser');
const cors =require('cors');
const path =require('path')

const app =express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var sign_s3 = require('./controllers');

app.use('/sign_s3', sign_s3.sign_s3);
const port =process.env.PORT || 5000;

app.listen(port,()=>console.log(`server running at ${port}`));