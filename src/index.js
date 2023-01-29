const express =require("express")
const mongoose = require("mongoose")
const route = require("./routes/routes")
const app = express()

mongoose.set("strictQuery",true)
app.use(express.json())

mongoose.connect("mongodb+srv://nishant55:1234@nishant99.et97kst.mongodb.net/Bonus_Project_4",{
    useNewUrlParser :true
})
.then(()=> console.log("Mongodb Connected"))
.catch(err=> console.log(err))

app.use('/',route);

app.listen(3000,function(){
    console.log("express app running on the port is" ,+ 3000)
})