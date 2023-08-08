import { Router } from "express";
import { validationAuth } from "../middlewares/validationAuth.middlewares.js";
import { validationSchema } from "../middlewares/validationSchema.middlewares.js";
import { getBunnies, getBunny, postBunny, updateBunny } from "../controllers/bunnies.controllers.js";
import { bunnySchema } from "../schemas/bunnies.schemas.js";


const bunnyRouter = Router()

bunnyRouter.get("/home", validationAuth, getBunnies)
bunnyRouter.get("/bunny/:id", validationAuth, getBunny)
bunnyRouter.post("/postBunny", validationAuth, validationSchema(bunnySchema), postBunny)
bunnyRouter.put("/bunny/:id", validationAuth, validationSchema(bunnySchema), updateBunny)

export default bunnyRouter