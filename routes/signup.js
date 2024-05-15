const express=require("express")
const router=express.Router()
const userinfoSchema=require('../models/userinfo')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
router.get('/',(req,res)=>{
    res.render('signup')
})


// method for creating a token
const createtoken=(id)=>{
  return jwt.sign({id},'secret',{expiresIn:3 * 24 * 60 * 60})
 }



router.post('/',async(req,res)=>{
    let errors={email:'',password:'',passerr:'',redirect:''}
     let {username,email,password,confirmpassword}=req.body
     if(password.length>=6){
      if(password===confirmpassword){
        password=bcryptjs.hashSync(password,10)
     
      const isemailpresent=await userinfoSchema.findOne({email})
    if(!isemailpresent){
      

   
     const infoschema=new userinfoSchema({username,email,password})
     infoschema.save()
     .then(()=>{
        console.log("saved succ to DB")
       // creating a jwt token and adding it to the session storage
       const token=createtoken(infoschema._id)
       console.log(token)
       res.cookie('jwt',token,{httpOnly:true,maxAge:3 * 24 * 60 * 60 * 60})
        errors.redirect='/home'
        res.status(200).json({errors})
     })
     .catch((err)=>{
        
       console.log(err)
        
     })
    }
    else{
      errors.email='this email is already taken'
      res.status(200).json({errors})
    }
    }
    else{
        errors.passerr='passwords doesnt match'
        res.status(200).json({errors})
    }
}
else{
    errors.password='minimum 6 charactars required'
    res.status(200).json({errors})
}
   
     
})

const handleErrors=(err)=>{
    const errors={email:'',password:''}
    if(err==='minlength'){
        errors.password='password should contain more than 6 characters'
        return errors
    }
   

    
}





module.exports=router