import { Router } from "express";
import userRouter from "./users.routes.js";
import bunnyRouter from "./bunnies.routes.js";

const router = Router();

router.use(userRouter)
router.use(bunnyRouter)


export default router;