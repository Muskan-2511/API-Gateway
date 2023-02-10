import express from 'express';
import multer from 'multer';


// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });


  let upload  = multer({ storage: storage });


import{ 
    addVideo,
    updateVideo,
    deleteVideo,
    getAllVideos,
    commentVideo,
    getComments,
    deleteComment,
    updateComment} from '../controller/video-controller.js';

const route = express.Router();
import auth from "../middleware/auth.js";

route.get('/allvideos',getAllVideos);
route.post('/addvideo',upload.single('somefile'),addVideo);
route.delete('/delete/:id',deleteVideo);
route.put('/update/:id', updateVideo);

//coments routes
route.post('/videos/:id/comments',commentVideo);
route.get('/videos/:id/comments',getComments);
route.delete("/videos/:id/comments/:commentId",deleteComment);
route.put('/videos/:id/comments/:commentId',updateComment);


// route.delete('/todos/:id', deleteTodo);

export default route;