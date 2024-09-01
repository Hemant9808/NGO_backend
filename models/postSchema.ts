import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    content:{
        type:String,
    },
    imageUrl:{
        type:String,
    }
},
{
    timestamps: true, 
}
)
    const Post = mongoose.model("post",postSchema)
    export default Post;