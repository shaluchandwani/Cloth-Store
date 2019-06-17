import http from 'http';
import express from 'express';
import logger from 'morgan';
import bodyParser from "body-parser";

const hostname = '127.0.0.1';

const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('*',(req,res) => res.status(200).json({
    message: " Now we can start JAWANS"
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});

