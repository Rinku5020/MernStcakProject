const express = require("express");
const {SingUp, Verification, SingIn, Logout} = require("../Controllers/User.Controller");

const UserRouter = express.Router();


UserRouter.post("/SingUp", SingUp);
UserRouter.post("/verification",Verification)
UserRouter.post("/SingIn",SingIn)
UserRouter.get("/logout",Logout)


module.exports = UserRouter;