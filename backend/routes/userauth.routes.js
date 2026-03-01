import e from "express";
import { loginController, logout, refresh, resetPassword, setNewPassword, signupController, verifyPasswordResetToken } from "../controllers/userauth.controller.js";
const authRouter = e.Router()

authRouter.post('/signup',signupController)
authRouter.post('/login',loginController)
authRouter.post('/refresh',refresh)
authRouter.post('/logout',logout)
authRouter.post('/resetpassword',resetPassword)
authRouter.post('/verifyPasswordResetToken',verifyPasswordResetToken)
authRouter.post('/setnewpassword',setNewPassword)

export default authRouter