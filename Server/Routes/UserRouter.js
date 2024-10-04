const express = require("express");
const SingUp = require("../Controllers/SingUp");

const UserRouter = express.Router();


UserRouter.post("/SingUp", SingUp);


module.exports = UserRouter;