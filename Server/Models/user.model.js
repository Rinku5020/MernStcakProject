const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true   // not for same mail id
    },
    password: {
        type: String,
        required: true
    },
    profileImage:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
   role:{
       type:String,
       default:"user"
   }

}, {

    timestamps: true, // for user Time when Create
    versionKey: false  //hide _v in MongoDB data base
})

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel