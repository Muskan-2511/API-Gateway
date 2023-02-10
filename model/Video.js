import mongoose from "mongoose";
import Comment from "./Comment.js";


const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true 
    },
    videoContent:{
        name:String,
        vid:{
            data:Buffer,
            contentType:String
           }
    },
    description:{
    type:String
    },
    comments: [Comment.schema],
    createdAt:{
     type:Date,
     default:new Date().toDateString()
    }  
});


const Video = mongoose.model('video', videoSchema);
export default Video;