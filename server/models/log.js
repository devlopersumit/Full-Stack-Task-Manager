const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    timestamp:{
        type:Date,
        default:Date.now
    },
    action:{
        type:String,
        required:true,
        enum:["Create Task", "Update Task", "Delete Task"]
    },
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        required:true
    },
    updatedContent:{
        type:Object,
        default:{}
    },
    notes:{
        type:String,
        default:''
    }
});

module.exports = mongoose.model("Log", logSchema);