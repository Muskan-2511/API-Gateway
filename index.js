import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import userRoutes from './routes/user.js';
import apiProxy from './proxy.js';

const app = express();


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ 
 limit: '50mb',
  parameterLimit: 100000,
  extended: true }));


app.use(cors());

app.use('/api', apiProxy);
app.use('/user',userRoutes);


const PORT = process.env.PORT||3000;

Connection();

app.listen(PORT, () => console.log(`Your server is running successfully on PORT ${PORT}`));


export default app;