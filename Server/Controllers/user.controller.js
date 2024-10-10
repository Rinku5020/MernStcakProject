const UserModel = require("../Models/user.model")
const generateOTP = require("../Utils/Otp")
const ejs = require("ejs")
const SendMail = require("../Utils/SendMail")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()
const SingUp = async (req, res) => {
    const { name, password, email } = req.body

    if (!name || !password || !email) {
        return res.status(400).json({ message: "All fields are required" })

    };
    try {
        const Data = await UserModel.findOne({ email })
        if (Data) {
            return res.status(400).json({ message: "Email already exists" })
        }
        const { otp, token } = generateOTP({ name, email, password })

        const htmlTemplate = await ejs.renderFile(__dirname + "/../views/mail.ejs", { name, otp })
        console.log(otp)
        await SendMail(email, htmlTemplate);

        res.cookie("Verification_token", token).status(200).json({ message: "please verify your OTP" })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const Verification = (req, res) => {
    const { otp } = req.body
    const { Verification_token } = req.cookies
    if (!otp) {
        return res.status(400).json({ message: "Please enter OTP" })
    }
    jwt.verify(Verification_token, process.env.privateKey_Verification, async function (err, decoded) {
        if (err) {
            console.log(err)
        }
        const { user, generateOTP } = decoded
        if (generateOTP !== otp) {
            return res.status(400).json({ message: "Invalid OTP" })
        }
        bcrypt.hash(user.password, 5,async function(err, hash) {
            if(err){
                return res.status(500).json({ message: err.message })
            }
            await UserModel.create({...user,password:hash})
        res.status(200).json({ message: "user create Successfully" })
        });
        

    });
}


const SingIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if(err){
                return res.status(500).json({ message: err.message })
            }
            if(!result){
                return res.status(400).json({ message: "Invalid password" })
            }
            const {password,...rest} = user._doc
            console.log(rest)
          const token = jwt.sign({userSingnInData:rest},process.env.privateKey_AccesToken)
          if(!token){
              return res.status(400).json({ message: "Invalid password" })
          }
          res.cookie("AccessToken",token).status(200).json({message:"login successfully"})

        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


const Logout = (req, res) => {
    res.clearCookie("AccessToken").status(200).json({ message: "logout successfully" })
}

const getUser = async (req,res)=>{
    const user=req.user
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    if(user._id !== req.params.userId){
        return res.status(400).json({message:"Invlid user"})
    }
    try {
        const userData = await UserModel.findOne({_id:req.params.userId})
        const {password,...rest} = userData._doc
        res.status(200).json({message:"user found Successfully",data:rest})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


const updateUser = async(req,res)=>{
    const {filename}=req.file

if(req.body.email || req.body.password || req.body.role)
{
   return res.status(400).json({message:"update not allowed"})
}
try {
    const updateUserData= await UserModel.findByIdAndUpdate(req.params.userId,
        {$set:{...req.body,profileImage:filename}})

    const {password,...rest}=updateUserData._doc
    return res.status(200).json({message:"Update Successfully",rest})
} catch (error) {
    return res.status(500).json({error:error.message})
}
}

// Admin Controlller

const getAllUsers = async (req, res) => {
try {
    const allUserData=await UserModel.find()
    if(!allUserData)
    {
        return res.status(400).json({message:"user not found"})
    }
    
    res.status(200).json({message:"All user get successfully",data:allUserData})
} catch (error) {
    return res.status(500).json({message:error.message})
}
}

module.exports = { SingUp, Verification, SingIn,Logout,getUser,updateUser,getAllUsers };
