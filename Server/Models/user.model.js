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
        required: true,
        minLenght: 8,
        maxLenght: 16
    },

}, {

    timestamps: true, // for user Time when Create
    versionKey: false  //hide _v in MongoDB data base
})

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel