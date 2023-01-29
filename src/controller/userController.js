const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const validator = require("../validation/validator")
const valid = require("validator")


const createUser = async function(req,res){
 let data = req.body
 let {name,email,password,role} = data

 if(Object.keys(req.body).length===0){
    return res.status(400).send({status:false, msg:"please enter data in body"})
}
if(!name || !validator.isValid(name)){
    return res.status(400).send({status:false, msg:" Please Enter Proper Name"})
}

if(!validator.isValidateName(name)){
    return res.status(400).send({status:false, msg:"name is Not Valid"})
}

if(!email || !validator.isValid(email)){
    return res.status(400).send({status:false, msg:"Please Enter Proper Email"})
}
if(!valid.isEmail(email)){
    return res.status(400).send({status:false, msg:"email is Not Valid"})
}

let checkEmail = await userModel.findOne({email:email})
if(checkEmail){
    return res.status(400).send({msg:"Email already exist"})
}

if(!password){
    return res.status(400).send({status:false, msg:"Password is Required"})
}

if(!validator.isValidPassword(password)){
    return res.status(400).send({status:false, msg:"password should be minimum 8 letters and max 15 letter and should conatin one special character,One UpperCase letter,One LowerCase,One Number"})
}

if(!role || !validator.isValid(role) ){
    return res.status(400).send({status:false, msg:"Please enter Proper Role"})
}

if(!(["Employee","Admin","Super Admin"].includes(role))) return res.status(400).send({status:false,message:"please provide valid title  like Employee ,AdminSuper, Admin"});

let encryptPassword = await bcrypt.hash(password,8)
  data.password = encryptPassword

 let savedata = await userModel.create(data)

 return res.status(200).send({status:true, msg:savedata})

}



const login = async function(req,res){
    let email = req.body.email
    let password = req.body.password

    if(Object.keys(req.body).length===0){
        return res.status(400).send({status:false, msg:"please enter data in body"})
    }

    if(!email){
        return res.status(400).send({status:false, msg:"emailId is Required"})
    }

    if(!password){
        return res.status(400).send({status:false, msg:"Password is Required"})
    }

    let findUser = await userModel.findOne({email:email})

    if(!findUser){
        return res.status(400).send({status:false,msg:"email or password may be incorrect"})
    }
    
    let decryptPassoword  = findUser.password.toString()
    const passmatch = await bcrypt.compare(password,decryptPassoword)

    if(!passmatch){
        return res.status(400).send({status:false,msg:"email or password may be incorrect"})
    }

    let token = jwt.sign({role:findUser.role.toString()},"bonusProject")

    return res.status(200).send({status:true,msg:token})
}

module.exports.createUser = createUser

module.exports.login = login