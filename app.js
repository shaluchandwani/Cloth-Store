
import express from 'express';
import logger from 'morgan';
import bodyParser from "body-parser";
import routers from "./server/routers/router";


const hostname = '127.0.0.1';

const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(routers)

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});

export default app;
