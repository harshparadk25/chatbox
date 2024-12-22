import express from "express"
import dotenv from 'dotenv'
import dbConnect from "./DB/dbConnect.js";
import authRouter from  './route/authUser.js'
import messageRouter from './route/messageRout.js'
import userRouter from './route/userRout.js'
import cookieParser from "cookie-parser";


import {app , server} from './Socket/socket.js'



dotenv.config();


app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter)



app.get("*",(req,res)=>{
    res.send("kya haaal hai bhai log")
})

const PORT = process.env.PORT || 3000

server.listen(PORT,()=>{
    dbConnect();
    console.log(`Working at ${PORT}`);
})