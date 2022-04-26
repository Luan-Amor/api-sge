import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { EventController } from "./controllers/EventController";
import { EnrollmentController } from "./controllers/EnrollmentController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { JwtUtil } from './config/JwtUtil';
import Authorization from './config/authorizationUtils';

const userController = new UserController();
const eventController = new EventController();
const enrollmentController = new EnrollmentController();
const authenticationController = new AuthenticationController();

const routes = Router();

    //Authentication
    routes.post('/login', authenticationController.login)
    .post('/logout', JwtUtil.checkToken, authenticationController.logout)
    // User
    .get('/users', userController.findUsers)
    .post('/users', userController.createUser)
    .get('/user', JwtUtil.checkToken, Authorization.isComun, Authorization.isEnterprise, userController.findUser)
    .put('/users', JwtUtil.checkToken, Authorization.isComun, Authorization.isEnterprise, userController.updateUser)
    .delete('/users', JwtUtil.checkToken, Authorization.isComun, Authorization.isEnterprise, userController.deleteUser)
    // Events
    .get('/events', eventController.findAll)
    .get('/events/:id', eventController.findOne)
    .post('/events', JwtUtil.checkToken, Authorization.isEnterprise, eventController.create)
    .put('/events', JwtUtil.checkToken, Authorization.isEnterprise, eventController.update)
    .delete('/events/:id', JwtUtil.checkToken, Authorization.isEnterprise, eventController.delete)
    // Events - Videos
    .post('/events/videos', JwtUtil.checkToken, Authorization.isEnterprise, eventController.addVideo )
    .delete('/events/videos/:idVideo', JwtUtil.checkToken, Authorization.isEnterprise, eventController.deleteVideo )
    // Enrollment 
    .get('/enrollments/', JwtUtil.checkToken, Authorization.isComun, enrollmentController.getUserEnrolls)
    .post('/enrollments/:idEvent', JwtUtil.checkToken, Authorization.isComun, enrollmentController.enroll)
    .post('/enrollments/', JwtUtil.checkToken, Authorization.isEnterprise, enrollmentController.validate)
    // Admin

export { routes }