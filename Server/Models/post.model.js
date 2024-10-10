const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    BlogImage: {
        type: String,
        default:"https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg"
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


const PostModel = mongoose.model("Post", postSchema);
module.exports = PostModel