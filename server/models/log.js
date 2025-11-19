const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    timestamp:{
        type:Date,
        default:Date.now
    },
    action:{
        type:String,
        required:true,
        enum:["CREATE", "UPDATE", "DELETE"]
    },
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    },
    updatedContent:{
        type:Object,
        default:null
    }
});

module.exports = mongoose.model("Log", logSchema);