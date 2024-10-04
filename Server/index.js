const express = require("express");
const dotenv=require("dotenv");
const  Connection = require("./db");
const UserRouter=require("./Routes/UserRouter")
dotenv.config()
const app=express()
app.use(express.json())
app.use("/user",UserRouter)



app.listen(process.env.PORT || 3000,async()=>{
    try {
        await Connection
        console.log("<<<Connected to DB>>>")
        console.log(`Server run on ${process.env.PORT || 3000}`)
    } catch (error) {
        console.log(error)
    }

})