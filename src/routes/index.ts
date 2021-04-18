import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { AuthController } from "../controllers/AuthController";
import { AvailabilityControler } from "../controllers/AvailabilityController";
import { BarberController } from "../controllers/BarberController";
import { ReviewsController } from "../controllers/ReviewsController";
import { ServiceController } from "../controllers/ServiceController";
import { UserController } from "../controllers/UserController";
import { Allow } from "../middlewares/Allow";

const usersController = new UserController();
const barbersController = new BarberController();
const servicesController = new ServiceController();
const appointmentsController = new AppointmentController();
const availabilityController = new AvailabilityControler();
const reviewsController = new ReviewsController();
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

//Barber Availabilities
router.post('/barber/availability', authorized.allowed, availabilityController.setAvailable);

//Barber Reviews
router.post('/barber/:id/review', authorized.allowed, reviewsController.setReview);
router.get('/barber/:id/reviews', reviewsController.getBarberReviews);

export { router }