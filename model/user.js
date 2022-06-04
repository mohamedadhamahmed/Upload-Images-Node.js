const mongoose=require('mongoose')


const user=mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        }, 
         age:{
            type:String,
            require:true
        }, 
         image:{
            type:String
        },
    }
);

module.exports=mongoose.model('User',user)