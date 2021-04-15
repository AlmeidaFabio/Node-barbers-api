import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { BarberController } from "../controllers/BarberController";
import { UserController } from "../controllers/UserController";
import { Allow } from "../middlewares/Allow";

const usersController = new UserController();
const barbersController = new BarberController();
const auth = new AuthController();
const authorized = new Allow();

const router = Router();

router.post('/login', auth.login);

//User Routes
router.post('/user', usersController.create);
router.get('/users', usersController.readAll);
router.get('/user/:id', usersController.readOne);
router.put('/user/:id', authorized.allowed ,usersController.update);
router.delete('/user/:id', authorized.allowed ,usersController.delete);

//Barber Routes
router.post('/barber', barbersController.create);
router.get('/barbers', barbersController.getBarbers);

export { router }