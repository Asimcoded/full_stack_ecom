import nodemailer from 'nodemailer'
import 'dotenv/config'
export const Transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL,
        pass : process.env.APP_PASSWORD
    }
})