import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.middlewares.js";import { validationAuth } from "../middlewares/validationAuth.middlewares.js";
import { signinSchema, signupSchema } from "../schemas/users.schemas.js";
import { logout, signin, signup } from "../controllers/users.controllers.js";

const userRouter = Router()
userRouter.post("/signup", validationSchema(signupSchema), signup);
userRouter.post("/signin", validationSchema(signinSchema), signin);
userRouter.delete('/logout', validationAuth, logout)

export default userRouter