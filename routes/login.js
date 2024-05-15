const express = require("express");
const router = express.Router();
const userinfoschema = require('../models/userinfo');
const bcryptjs = require('bcryptjs');
const jwt=require('jsonwebtoken')

router.get('/', (req, res) => {
    res.render('login');
});

// Handling login POST requests
router.post('/', async (req, res) => {
    let result={password:'',email:'',success:'',redirect:''}
    const { email, password } = req.body;
    try {
        const condition = await confirmDetails(email, password);
         console.log(`the condition is ${condition}`)
        if(condition==='match'){
 
             const user=await userinfoschema.findOne({email})
            const token=createtoken(user._id)
            res.cookie('jwt',token,{httpOnly:true,maxAge:3 * 24 * 60 * 60})
            


            result.success='passwords match and login successfull'
            result.redirect='/home'
            res.status(200).json({result})
        }
        else if(condition==='passnmatch'){
              result.password='passwords dont match'
            res.status(200).json({result})
        }
        else{
            result.email='email doesnt exist, signup'
            res.status(200).json({result})
        }


    } catch (error) {
        console.error("Error:", error);
       
    }
});

// method for checking the given parameters 
const confirmDetails = async (email, password) => {
    try {
        console.log(password)
        const user = await userinfoschema.findOne({ email }); 
        console.log(user)
        
        if (!user) {
            return 'emaildoesntexist';
        }
        const hashpass = user.password;
        const match = await bcryptjs.compare(password, hashpass);
        if (match) {
            
            return 'match';
        } else {
            return 'passnmatch';
        }
    } catch (error) {
        throw error;
    }
};


// method for creating a token
const createtoken=(id)=>{
    return jwt.sign({id},'secret',{expiresIn:3 * 24 * 60 * 60 * 60})
   }

module.exports = router;
