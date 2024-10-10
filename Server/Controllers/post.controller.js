const PostModel = require("../Models/post.model")

const CreatePost = async (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({ message: "All fields are required" })
    }
    if (req.body.userId) {
        return res.status(400).json({ message: "Invalid request" })
    }
    try {
        const PostData = await PostModel.create({ ...req.body, userId: req.user._id })
        res.status(200).json({ message: "Post created successfully", data: PostData })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}


const DeletePostByAdmin = async (req, res) => {
    if (req.user._id != req.params.userId) {
        return res.status(400).json({ message: "Invalid request" })
    }
    try {
        const post = await PostModel.findOne({ _id: req.params.postId })
        if (!post) {
            return res.status(400).json({ message: "Post not found" })
        }
        const deletePost = await PostModel.findByIdAndDelete(req.params.postId)
        res.status(200).json({ message: "Post deleted successfully", data: deletePost })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

const UpadatePostByAdmin = async (req, res) => {
    const{filename}=req.file
    if (req.user._id != req.params.userId) {
        return res.status(400).json({ message: "Invalid request" })
    }
    try {
        const post = await PostModel.findOne({ _id: req.params.postId })
        if (!post) {
            return res.status(400).json({ message: "Post not found" })
        }
        const UpdatePost= await PostModel.findByIdAndUpdate(req.params.postId,{$set:{...req.body,BlogImage:filename}})
        res.status(200).json({message:"Post Update Successfully",data:UpdatePost})
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports =
{
    CreatePost,
    DeletePostByAdmin,
    UpadatePostByAdmin
}