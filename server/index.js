import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

/* TODO: figure out why this is not working
app.arguments(bodyParser.json({limit:"30mb", extended:true}));
app.arguments(bodyParser.urlencoded({limit:"30mb", extended:true}));
*/
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://analyticalmeanderings:gopher@oilsupplymap.hqm30.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log('Server running on port: ${PORT}')))
    .catch((error)=> console.log(error.message));