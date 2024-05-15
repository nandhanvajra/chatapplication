const mongoose=require('mongoose')
const schema=mongoose.Schema

const roominfoschema=new schema({
    roomname:{type:String,required:true},
    messages:[{message:{type:String,required:true},
             username:{type:String,required:true},
             time:{type:String,required:true}
            }]
   
})
module.exports=mongoose.model('roominfoschema',roominfoschema)