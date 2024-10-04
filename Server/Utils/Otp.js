const otpGenerator = require('otp-generator');
const jwt = require("jsonwebtoken")
const dotenv = require ("dotenv")
dotenv.config()
const generateOTP = (user) => {
    const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })

    jwt.sign({user,generateOTP:otp},process.env.privateKey_Verification , function(err, token) {
        if (err) {
            console.log(err)
        }
        return({token,otp})
    });



}
module.exports = generateOTP