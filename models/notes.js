const mongoose=require('mongoose');

const notesSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,     //Foreign key of User Collection
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
      
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Notes=mongoose.model('Notes',notesSchema);
module.exports=Notes;