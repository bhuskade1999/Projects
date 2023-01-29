const courceModel = require("../model/courceModel")

 const createCource = async function(req,res){
    data = req.body
    if(Object.keys(req.body).length===0){
        return res.status(400).send({status:false, msg:"please enter data in body"})
    }
    if(!title || !validator.isValid(title)){
        return res.status(400).send({status:false, msg:" Please Enter Proper Name"})
    }

    if(!description || !validator.isValid(description)){
        return res.status(400).send({status:false, msg:" Please Enter Proper Name"})
    }

    if(!video_Url || !validator.isValid(video_Url)){
        return res.status(400).send({status:false, msg:" Please Enter Proper Name"})
    }
    if (!validator.isURL(video_Url.trim())) {
        return res
          .status(400)
          .send({ status: false, message: "please enter valid Vide_Url" });
      }

    if(!topics_array || !validator.isValid(topics_array)){
        return res.status(400).send({status:false, msg:" Please Enter Proper Name"})
    }

    if(!duration|| !validator.isValid(duration)){
        return res.status(400).send({status:false, msg:" Please Enter Proper Name"})
    }

    if(!category|| !validator.isValid(category)){
        return res.status(400).send({status:false, msg:" Please Enter Proper Name"})
    }

    let savedata = await courceModel.create(data)
    return res.send({status:true, msg:savedata})

 }









 const aproveCource = async function(req,res){

    let data = req.body
    if(req.token !== "Super Admin") return res.send({status:false,msg:"Only Super Admin Can Able to aproved that cource"})

    let savedata = await courceModel.findOneAndUpdate(data,{isAproved:true},{new:true})

    return res.send({status:false,msg:savedata})

 } 


 const getCource = async function(req,res){
    if(req.token == "Employee"){
     let savedata = await courceModel.find({isAproved:true,isDeleted:false})
        if(savedata.length == 0){
            return res.send({status:false,msg:"no cource found"})
        }
        return res.send({status:true, msg: savedata })
    }

    if(req.token == "Admin" || req.token == "Super Admin" ){
         let savedata = await courceModel.find()
    }





 }

 module.exports.createCource = createCource

 module.exports.aproveCource = aproveCource