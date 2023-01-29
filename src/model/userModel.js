const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

name :{
    type:String,
},
email:{
    type:String
},
password:{
    type:String
},
role:{
    type:String,
    enum :["Employee","Admin","Super Admin"],
     default:"Employee"
},


},{ timestamps:true },


)

module.exports = mongoose.model("Employee",userSchema)