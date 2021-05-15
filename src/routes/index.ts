import { Router } from "express";
import multer from 'multer';
import { AppointmentController } from "../controllers/AppointmentController";
import { AuthController } from "../controllers/AuthController";
import { AvailabilityControler } from "../controllers/AvailabilityController";
import { BarberController } from "../controllers/BarberController";
import { FavoritesController } from "../controllers/FavotitesController";
import { PhotosController } from "../controllers/PhotosController";
import { ReviewsController } from "../controllers/ReviewsController";
import { SearchController } from "../controllers/SearchController";
import { ServiceController } from "../controllers/ServiceController";
import { UserController } from "../controllers/UserController";
import { Allow } from "../middlewares/Allow";
import CoverUpload from "../middlewares/CoverUpload";
import PhotosUpload from "../middlewares/PhotosUpload";

const usersController = new UserController();
const barbersController = new BarberController();
const servicesController = new ServiceController();
const appointmentsController = new AppointmentController();
const availabilityController = new AvailabilityControler();
const reviewsController = new ReviewsController();
const favoritesController = new FavoritesController();
const photosController = new PhotosController();
const searchController = new SearchController();
const auth = new AuthController();
const authorized = new Allow();

const router = Router();

//User Routes
router.post('/user/login', auth.login);
router.post('/user', multer(CoverUpload).single("cover") , usersController.create);
router.get('/users', usersController.readAll);
router.get('/user/:id', usersController.readOne);
router.put('/user/:id', authorized.allowed ,usersController.update);
router.delete('/user/:id', authorized.allowed ,usersController.delete);

//Barber Routes
router.post('/barber/login', auth.barberLogin);
router.post('/barber', multer(CoverUpload).single("cover"), barbersController.create);
router.get('/barbers', barbersController.getBarbers);
router.get('/barber/:id', barbersController.getBarber);
router.put('/barber/:id', authorized.allowed, barbersController.update);
router.delete('/barber/:id', authorized.allowed, barbersController.delete);

//Favorites
router.post('/user/favorite/:barber_id', authorized.allowed, favoritesController.toggleFavorite);

//Services
router.post('/service', authorized.allowed, servicesController.setService);
router.delete('/service/:id', authorized.allowed, servicesController.deleteService);

//Appointments
router.post('/barber/:id/appointment', authorized.allowed, appointmentsController.setAppointment);

//Barber Availabilities
router.post('/barber/availability', authorized.allowed, availabilityController.setAvailable);
router.get('/barber/:id/availabilities', availabilityController.listBarberAvailabilities);

//Barber Reviews
router.post('/barber/:id/review', authorized.allowed, reviewsController.setReview);


//Barber Photos
router.post('/barber/upload/photos', authorized.allowed, multer(PhotosUpload).single("photo"),  photosController.uploadPhotos);

//Search
router.get('/search', searchController.search);

export { router }