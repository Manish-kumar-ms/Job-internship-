import mongoose from 'mongoose';


const applySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    resume:{
        type:String,
        required:true
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const applyModel=mongoose.model('applyModel', applySchema);
export default applyModel;
