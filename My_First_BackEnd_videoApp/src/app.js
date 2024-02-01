import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: true, limit: "10kb"}));
app.use(express.static("public"));
app.use(cookieParser());



import userRouter from './routes/user.router.js'
app.use("/users", userRouter)

export default app