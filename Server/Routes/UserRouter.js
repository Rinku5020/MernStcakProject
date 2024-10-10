const express = require("express");
const {SingUp, Verification, SingIn, Logout, getUser, updateUser, getAllUsers} = require("../Controllers/User.Controller");
const isAuth = require("../Middlewares/isAuth");
const upload = require("../Utils/multer");
const roleValidator = require("../Middlewares/role");

const UserRouter = express.Router();


UserRouter.post("/SingUp", SingUp);
UserRouter.post("/verification",Verification)
UserRouter.post("/SingIn",SingIn)
UserRouter.get("/logout",Logout)
UserRouter.get("/getUser/:userId",isAuth, getUser)
UserRouter.patch("/updateUser/:userId",isAuth,upload.single("profilePic"),  updateUser)

// Admin Routes
UserRouter.get("/getAllUser",isAuth,roleValidator,getAllUsers)


module.exports = UserRouter;