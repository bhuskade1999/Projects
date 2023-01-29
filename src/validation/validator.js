
const isValid = (value) => {
    if (typeof value === "undefined" || value === null || value === "") {
          return false
    }
    if (typeof value === "string" && value.trim().length > 0) {
          return true
    }
};

const isValidateName = function(name){
    const regex = /^([a-z  A-Z ]){2,50}$/
    return regex.test(name)
} ;
 

  const isValidPassword = (value) => {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/  
    return passRegex.test(value)
};
 
//const email= fuction()

module.exports={isValidateName, isValidPassword, isValid}