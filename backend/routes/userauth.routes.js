import e from "express";
import { getProfile, loginController, logout, refresh, resetPassword, setNewPassword, signupController, verifyPasswordResetToken } from "../controllers/userauth.controller.js";
import { auth } from "../middleware/auth.middleware.js";
const authRouter = e.Router()

authRouter.post('/register',signupController)
authRouter.post('/login',loginController)
authRouter.post('/refresh',refresh)
authRouter.post('/logout',logout)
authRouter.post('/resetpassword',resetPassword)
authRouter.post('/verifyPasswordResetToken',verifyPasswordResetToken)
authRouter.post('/setnewpassword',setNewPassword)
authRouter.get('/profile',auth,getProfile)

export default authRouter