const mongoose =require("mongoose")

const courceSchema = new mongoose.Schema({

    title:{
        type:String
    }, 
    
    description:{
        type:String
    },

    video_Url:{
        type:String
    }, 
     
    topics_array:{
        type :[]
     }, 

    duration:{
        type:String
     },

    category:{
        type:String
    },
    
    isAproved:{
        type:Boolean,
        default:false
    },

    isDeleted:{
        type:Boolean,
        default:false
    },

},{timestamps:true}

)

module.exports = mongoose.model("Cource",courceSchema)