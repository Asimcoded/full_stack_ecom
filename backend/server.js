import express from "express"
import "dotenv/config"
import cors from 'cors'
import logging from "express-logging"
import logops from "logops"  
import dbConnection from "./configs/db.config.js"
import healthRouter from "./routes/health.routes.js"
import authRouter from "./routes/userauth.routes.js"
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(logging(logops))
await dbConnection()
app.use('/api/v1',healthRouter)
app.use('/api/v1/auth',authRouter)



app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
})
