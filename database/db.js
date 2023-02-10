import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
 

 const Connection = () => {

    const MONGODB_URI = "mongodb://127.0.0.1:27017/youtubeDB";
    // const MONGODB_URI = "mongodb+srv://admin-pranav:2Y6VIdfaYoEGERTG@cluster0.8rr4a.mongodb.net/davidtodoDB";

    mongoose.connect(MONGODB_URI, { useNewUrlParser: true,
    useUnifiedTopology: true
     });

    mongoose.connection.on('connected', () => {
        console.log('Database connected Successfully');
    
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Database disconnected');
    })

    mongoose.connection.on('error', () => {
        console.log('Error while connecting with the database ', error.message);
    })
}

export default Connection;