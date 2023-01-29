const jwt=require("jsonwebtoken");

const auth=async function(req,res,next){
   try{ 
    let token =req.headers["x-api-key"];
   
    if(!token) return res.status(404).send({status:false,message:"token must be present"});

    let decodedToken = jwt.verify(token, "bonusProject")
    req.token = decodedToken.role
     next();
 
   }

   catch(error){
    return res.status(500).send({status:false,message:error.message})

   }
};


const authorise = function(req, res, next) {
    if(req.token !="Admin"){
        return res.send({status:false,msg:"Only Admin can create cource"})
    } 
    next()
}








module.exports={auth,authorise};