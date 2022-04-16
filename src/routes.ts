import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { EventController } from "./controllers/EventController";
import { EnrollmentController } from "./controllers/EnrollmentController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { JwtUtil } from './config/JwtUtil';

const userController = new UserController();
const eventControler = new EventController();
const enrollmentController = new EnrollmentController();
const authenticationController = new AuthenticationController();

const routes = Router();

    //Login
    routes.post('/login', authenticationController.login)
    // User
    .get('/users', userController.findUsers)
    .get('/user', JwtUtil.checkToken, userController.findUser)
    .post('/users', userController.createUser)
    .put('/users', JwtUtil.checkToken, userController.updateUser)
    .delete('/users', JwtUtil.checkToken, userController.deleteUser)
    // Events
    .get('/events', eventControler.findAll)
    .get('/events/:id', eventControler.findOne)
    .post('/events', JwtUtil.checkToken, eventControler.create)
    .put('/events', JwtUtil.checkToken, eventControler.update)
    .delete('/events/:id', JwtUtil.checkToken, eventControler.delete)
    // Enrollment 
    .get('/enrollment/', JwtUtil.checkToken, enrollmentController.getEnrollment)
    .get('/enrollment/:id', JwtUtil.checkToken, enrollmentController.getUserEnrolls)
    .post('/enrollment', JwtUtil.checkToken, enrollmentController.enroll)

export { routes }