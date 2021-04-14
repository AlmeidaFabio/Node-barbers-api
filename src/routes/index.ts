import { Router } from "express";
import { UserController } from "../controllers/UserController";

const usersController = new UserController();

const router = Router();

router.post('/user', usersController.create);

export { router }