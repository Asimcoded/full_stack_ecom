import e from "express";
import { dbCheckController, healthCheckController } from "../controllers/health.controller.js";
const healthRouter = e.Router()


healthRouter.get('/healthcheck',healthCheckController)
healthRouter.get('/dbcheck',dbCheckController)

export default healthRouter