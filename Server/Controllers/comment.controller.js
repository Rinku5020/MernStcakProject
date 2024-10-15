const commentModel = require("../Models/comment.model")
const CreateCommentController = async (req, res) => {

    const { userId, postId, comment } = req.body
    try {

        if (req.user._id != userId) {
            return res.status(400).json({ message: "Invalid request" })
        }


        if (!userId || !postId || !comment) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const CreateComment = await commentModel.create({ userId, postId, comment })
        res.status(200).json({ message: "Comment created successfully", data: CreateComment })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const GetPostComment = async (req, res) => {
    try {

        const CommentOnPost = await commentModel.find({ postId: req.params.postId })
        res.status(200).json({ message: "Comment get successfully", data: CommentOnPost })
        if (!CommentOnPost) {
            return res.status(400).json({ message: "Comment not found" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const EditComment = async (req, res) => {
    
    if(req.body.userId || req.body.postId)
    {
        return res.status(400).json({ message: "update not allowed" })
    }
    if(req.user._id!=req.params.userId)
    {
        return res.status(400).json({ message: "Invalid request" })
    }

    try {

        const EditComment= await commentModel.findById(req.params.commmentId)
        if(!EditComment)
        {
            return res.status(400).json({ message: "Comment not found" })
        }
        const UpdateComment = await commentModel.findByIdAndUpdate(req.params.commmentId,{$set:{comment:req.body.comment}})
        
        res.status(200).json({ message: "Comment updated successfully", data: UpdateComment })
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const DeleteComment = async (req, res) => {
    if(req.user._id!=req.params.userId || !req.user.role== "admin")
        {
            return res.status(400).json({ message: "Invalid request" })
        }
        try {
        const deleteComment = await commentModel.findById(req.params.commmentId)
        if(!deleteComment)
        {
            return res.status(400).json({ message: "Comment not found" })
        }
        const DeleteComment = await commentModel.findByIdAndDelete(req.params.commmentId)
        res.status(200).json({ message: "Comment deleted successfully", data: DeleteComment })


        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
}

const GetTotalCommentByAdmin = async(req,res)=> 
{
    try {
        
        const getTotalComment = await commentModel.find()
        .limit(req.params.limit || 5)
        .skip(req.params.skip || 0)
        .sort({createdAt:-1})
        if(!getTotalComment)
        {
            return res.status(400).json({ message: "Comment not found" })
        }
        res.status(200).json({ message: "Comment get successfully", data: getTotalComment })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const likes = async (req, res) => 
    {
        try {
            const comment = await commentModel.findById(req.params.commentId)
            if(!comment)
            {
                return res.status(400).json({ message: "Comment not found" })
            }
            const index = comment.likes.indexOf(req.params.userId)
            if(index == -1)
            {
                comment.likes.push(req.params.userId)
                comment.NumberOfLikes += 1
            }
            else
            {
                comment.likes.splice(index,1)
                comment.NumberOfLikes -= 1
            }
            const updateComment = await comment.save()
            res.status(200).json({ message: "Comment liked successfully", data: updateComment })
            
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
        


    }



module.exports =
{
    CreateCommentController,
    GetPostComment,
    EditComment,
    DeleteComment,
    GetTotalCommentByAdmin,
    likes


}