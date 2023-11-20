import express from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

router.post("/signUp",UserController.signUp);
router.post("/login",UserController.login);
router.post("/logout",UserController.logout);


export default router;