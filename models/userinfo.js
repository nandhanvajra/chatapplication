const mongoose=require('mongoose')
const schema=mongoose.Schema
const {isEmail}=require('validator')

const userinfoSchema=new schema({
    username:{type:String ,required:true},
    email:{type:String,required:true,validate:[isEmail,"give a valid email"]},
    password:{
        type:String,
        required:true,
        

    }

})

module.exports=mongoose.model('userinfoSchema',userinfoSchema)