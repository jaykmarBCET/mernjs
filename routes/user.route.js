import express from 'express'
import { registerUser,getUserProfile,updateProfile,loginUser } from '../controllers/user.controller.js'
import { authVerify } from '../middleware/authMiddleware.js'


const userRoute = express.Router()

userRoute.get("/profile",authVerify,getUserProfile)
userRoute.post("/profile/register",registerUser)
userRoute.post("/profile/login",loginUser)
userRoute.put("/profile/update",authVerify,updateProfile)


export {
    userRoute
}