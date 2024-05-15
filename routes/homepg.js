const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const infoschema = require('../models/userinfo');
const io = require('../app'); 
const roominfoschema=require('../models/roominfo')

let user = {};
let userinfo = {};

// Checking the cookie
const checkcook = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.redirect('/login'); // Return to prevent further execution
            } else {
                console.log(`the decoded is  /////// ${decoded}//////`)
                user = decoded.id;
                next();
            }
        });
    } else {
        return res.redirect('/login'); // Return to prevent further execution
    }
};

router.get('/', checkcook, (req, res) => {
    
   
    infoschema.findOne({ _id: user })
        .then((result) => {
            userinfo = result;
            console.log(`the userinfo is ${userinfo}`);
            res.render('homepg', { userinfo });
        })
        .catch((error) => {
            console.error('Error retrieving user info:', error);
            res.status(500).send('Internal Server Error');
        });
});

//handling the different room ids
router.get('/:id',checkcook,(req,res)=>{
    let messages=[]
    
    console.log(`//////////${req}`)
    const roomname=req.params.id
    console.log(roomname)
    infoschema.findOne({ _id: user })
    .then(async(result) => {
        userinfo = result;
        console.log(`the userinfo is ${userinfo}`);
        const roominf= await roominfoschema.findOne({roomname})
        if(roominf){
            console.log(roominf)
          messages=roominf.messages

         // console.log(`the messages are ///////// ${messages} ////`)
         res.render('rooms',{messages,userinfo})
    }
    else{
      
        res.render('rooms',{messages,userinfo})
    }
        

    })
    .catch((error) => {
        console.error('Error retrieving user info:', error);
        res.status(500).send('Internal Server Error');
    });
    
});

// socket.io connection 


module.exports = router;
