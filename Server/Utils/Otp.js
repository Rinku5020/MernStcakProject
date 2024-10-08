const otpGenerator = require('otp-generator');
const jwt = require("jsonwebtoken")
const dotenv = require ("dotenv")
dotenv.config()
const generateOTP = (user) => {
    const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })

     const token = jwt.sign({ user,generateOTP:otp}, process.env.privateKey_Verification);

    return {otp,token}


}
module.exports = generateOTP