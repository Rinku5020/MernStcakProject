const UserModel = require("../Models/user.model")
const generateOTP = require("../Utils/Otp")

const SingUp = async (req, res) => {
 const{name,password,email}=req.body

if(!name || !password || !email){
    return res.status(400).json({message:"All fields are required"})

};
if(! (password.length>6 && password.length<16)){
    return res.status(400).json({message:"Password should be between 6 and 16 characters"})
};  

 const Data= await UserModel.findOne({email})
 if(Data){
    return res.status(400).json({message:"Email already exists"})
 }
 const temp= generateOTP({email,password,name})
 console.log(temp)
res.send("ok")
}

module.exports = SingUp;
