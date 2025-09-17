import express from 'express'
import { userGet } from '../controllers/user.controller.js'

const userRoute = express.Router()

userRoute.get("/",userGet)

export {
    userRoute
}