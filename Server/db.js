const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config()
const Connection = mongoose.connect(process.env.MONGO_URL)


module.exports = Connection