const mongoose=require("mongoose");
const CommentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    likes:
    {
        type:Array,
        default:[]
    },
    NumberOfLikes:
    {
        type:Number,
        default:0
    }

},{
    timestamps:true,
    versionKey:false
})


const CommentModel=mongoose.model("comment",CommentSchema)

module.exports=CommentModel