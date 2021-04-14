import { Router } from "express";
import { BarberController } from "../controllers/BarberController";
import { UserController } from "../controllers/UserController";

const usersController = new UserController();
const barbersController = new BarberController();

const router = Router();

//User Routes
router.post('/user', usersController.create);
router.get('/users', usersController.readAll);
router.get('/user/:id', usersController.readOne);

//Barber Routes
router.post('/barber', barbersController.create);
router.get('/barbers', barbersController.readAll);

export { router }