const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const  multerS3 = require('multer-s3')
 
const router =express.Router();
const  s3 = new aws.S3({ 
  accessKeyId:'AKIAQC6PIKSK2574L5EG',
  secretAccessKey:'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',
  Bucket:'onClick'
  

 })
 