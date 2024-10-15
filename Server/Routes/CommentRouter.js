const express = require("express");
const { CreateCommentController, GetPostComment, UpadetComment, EditComment, DeleteComment, GetTotalCommentByAdmin, likes } = require("../Controllers/comment.controller");
const isAuth = require("../Middlewares/isAuth");
const roleValidator = require("../Middlewares/role");

const CommentRouter = express.Router();

CommentRouter.post("/createComment",isAuth,CreateCommentController)
CommentRouter.get("/getComment/:postId",isAuth,GetPostComment)
CommentRouter.patch("/edit/:commmentId/:userId",isAuth,EditComment)
CommentRouter.delete("/delete/:commmentId/:userId",isAuth,DeleteComment)
CommentRouter.get("/getTotalComment",isAuth,roleValidator,GetTotalCommentByAdmin)
CommentRouter.patch("/likes/:commentId/:userId",isAuth,likes)

module.exports=CommentRouter