const express = require("express");
const router = express.Router();
const jwt=require('jsonwebtoken')

//deleting a cookie

const delcookie=(req,res,next)=>{
    res.cookie('jwt','',{maxAge:1})
    next()
}


router.get('/',delcookie,(req,res)=>{
    res.redirect('/')
})

module.exports=router