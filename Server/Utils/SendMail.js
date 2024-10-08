const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config()
const transporter = nodemailer.createTransport({
 service: process.env.service,
  auth: {
    user: process.env.userMail,
    pass: process.env.appPasword,
  },
});


async function SendMail(email,htmlTemplate) {
    
    const info = await transporter.sendMail({
      from: process.env.userMail, 
      to:email,
      subject: "Verification ✔", 
      html: htmlTemplate,
    });
}
  module.exports=SendMail