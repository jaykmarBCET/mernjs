import express from 'express'
import  {userRoute} from '../routes/user.route.js'
import dotenv from 'dotenv'
import {connectDB} from '../config/db.js'

dotenv.config()

connectDB()

const app = express()

// Config , register, middleware or plugin api routes
app.use("/user",userRoute)


export default app

