const express = require("express");
const { CreatePost, DeletePostByAdmin, UpadatePostByAdmin } = require("../Controllers/post.controller");
const isAuth = require("../Middlewares/isAuth");
const roleValidator = require("../Middlewares/role");
const upload = require("../Utils/multer");
const PostRouter = express.Router()

PostRouter.post("/create",isAuth,roleValidator, CreatePost)
PostRouter.delete("/delete/:postId/:userId",isAuth,roleValidator,DeletePostByAdmin)
PostRouter.patch("/update/:postId/:userId",isAuth,roleValidator,upload.single("blogImage") ,UpadatePostByAdmin)



module.exports = PostRouter