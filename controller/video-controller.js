import Video from '../model/Video.js';
import Comment from '../model/Comment.js';
import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();

  
export const addVideo = async (request, response) => {
    console.log(request.body);
    console.log(request.file);
    try {
        
        const newVideo = await Video.create({
            title: request.body.title,
            description: request.body.description,
            videoContent:{
                name:request.file.originalname,
                vid:{
                   data:fs.readFileSync(path.join(__dirname + '/uploads/' + request.file.filename)),
                   contentType:'image/png'
                }
               }
        });
        await newVideo.save();
        return response.status(200).json(newVideo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}


export const getAllVideos = async (request, response) => {
    console.log(" get all videos called");
    try {
        const videos= await Video.find({}).sort({'createdAt':-1});
        return response.status(200).json({ data:videos});
    
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const deleteVideo = async (request, response) => {
    try {
       await Video.findByIdAndDelete(request.params.id);
       return response.status(200).json({message:"Successfully Deleted"});
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const updateVideo = async (request, response) => {
    const {id}=request.params;
    console.log(request.body)
    try {
        console.log(id);
        await Video.findByIdAndUpdate(id, {
            title: request.body.title,
            description: request.body.description
        });
        
        const video = await Video.findById(id);
        return response.status(200).json({ data:video,message:"Successfully Updated"});
    
    } catch (error) {
        return response.status(500).json(error.message);
    }
}



export const commentVideo = async (req, res) => {
    console.log("adding comment called");

    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).send({ error: 'Video not find' });
    
        const comment = await Comment.create({
          text: req.body.text,
          author: req.body.author
        });

        
        video.comments.push(comment);
        await video.save();
        return res.status(201).json({message:"Successfully Added the comment",comment:comment});
      } catch (error) {
        res.status(500).send({ error: error.message });
      }

};


export const getComments = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
          return res.status(404).json("video not find");
        }
    
    
        return res.status(200).json(video.comments);
      } catch (err) {
        return res.status(500).json(err.message);
      }
};




export const updateComment = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).send({ error: 'video not found' });
    
        const comment = video.comments.id(req.params.commentId);
        if (!comment) return res.status(404).send("Comment not found");
    
        comment.text = req.body.text;
        await video.save();
        return res.status(200).json({message:"Comment updated successfully!"});
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
};

export const deleteComment = async (req, res) => {

    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).send({ error: 'Video not found' });
    
        const comment = video.comments.id(req.params.commentId);
        if (!comment) return res.status(404).send("Comment not found");
    
        await comment.remove();
        await video.save();
        return res.status(201).json({message:"Comment deleted successfully!"});
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
};

