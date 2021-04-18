import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { AuthController } from "../controllers/AuthController";
import { BarberController } from "../controllers/BarberController";
import { ServiceController } from "../controllers/ServiceController";
import { UserController } from "../controllers/UserController";
import { Allow } from "../middlewares/Allow";

const usersController = new UserController();
const barbersController = new BarberController();
const servicesController = new ServiceController();
const appointmentsController = new AppointmentController();
const auth = new AuthController();
const authorized = new Allow();

const router = Router();

//User Routes
router.post('/user/login', auth.login);
router.post('/user', usersController.create);
router.get('/users', usersController.readAll);
router.get('/user/:id', usersController.readOne);
router.put('/user/:id', authorized.allowed ,usersController.update);
router.delete('/user/:id', authorized.allowed ,usersController.delete);

//Favorites
router.post('/user/favorite', authorized.allowed, usersController.toggleFavorite);
router.get('/user/:id/favorites', authorized.allowed, usersController.getFavorites);

//Barber Routes
router.post('/barber/login', auth.barberLogin);
router.post('/barber', barbersController.create);
router.get('/barbers', barbersController.getBarbers);
router.get('/barber/:id', barbersController.getBarber);
router.put('/barber/:id', authorized.allowed, barbersController.update);
router.delete('/barber/:id', authorized.allowed, barbersController.delete);

//Services
router.post('/service', authorized.allowed, servicesController.setService);

//Appointments
router.post('/barber/:id/appointment', authorized.allowed, appointmentsController.setAppointment);
router.get('/user/:id/appointments/', authorized.allowed, appointmentsController.getAppointments);

export { router }