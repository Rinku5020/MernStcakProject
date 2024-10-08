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

}, {

    timestamps: true, // for user Time when Create
    versionKey: false  //hide _v in MongoDB data base
})

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel