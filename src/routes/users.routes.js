import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.middlewares.js";import { validationAuth } from "../middlewares/validationAuth.middlewares.js";
import { signinSchema, signupSchema, updateUserSchema } from "../schemas/users.schemas.js";
import { getUser, logout, signin, signup, updateUser } from "../controllers/users.controllers.js";

const userRouter = Router()
userRouter.post("/signup", validationSchema(signupSchema), signup);
userRouter.post("/signin", validationSchema(signinSchema), signin);
userRouter.delete('/logout', validationAuth, logout);
userRouter.get("/user/:id", validationAuth, getUser);
userRouter.put("/user/:id", validationAuth, validationSchema(updateUserSchema), updateUser)
export default userRouter