import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authUserRouter from './routes/authUser'

const app = express();



const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
apiRouter.use(cookieParser());
app.use(cors());


app.use('/user', authUserRouter)

app.listen(PORT, () => {
    console.log(`server is listening  on ${PORT}`);
});

module.exports = app;