import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRouter from './routes/post.route.js'
import cookieParser from 'cookie-parser'
dotenv.config()

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('connected to database')
    })
    .catch((err) => {
        console.log(err)
    })
const app = express();
app.use(cookieParser())

app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server erorr';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,

    });
});

app.listen(3000, () => {
    console.log('server is listening on port 3000')
})