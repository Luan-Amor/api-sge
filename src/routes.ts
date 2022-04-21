import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { EventController } from "./controllers/EventController";
import { EnrollmentController } from "./controllers/EnrollmentController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { JwtUtil } from './config/JwtUtil';
import Authorization from './config/authorizationUtils';

const userController = new UserController();
const eventControler = new EventController();
const enrollmentController = new EnrollmentController();
const authenticationController = new AuthenticationController();

const routes = Router();

    //Login
    routes.post('/login', authenticationController.login)
    // User
    .get('/users', userController.findUsers)
    .get('/user', JwtUtil.checkToken, Authorization.isComun, userController.findUser)
    .post('/users', userController.createUser)
    .put('/users', JwtUtil.checkToken, userController.updateUser)
    .delete('/users', JwtUtil.checkToken, userController.deleteUser)
    // Events
    .get('/events', eventControler.findAll)
    .get('/events/:id', eventControler.findOne)
    .post('/events', JwtUtil.checkToken, Authorization.isEnterprise, eventControler.create)
    .put('/events', JwtUtil.checkToken, Authorization.isEnterprise, eventControler.update)
    .delete('/events/:id', JwtUtil.checkToken,Authorization.isEnterprise, eventControler.delete)
    // Enrollment 
    .get('/enrollment/', JwtUtil.checkToken, Authorization.isComun, enrollmentController.getEnrollment)
    .get('/enrollment/:id', JwtUtil.checkToken, Authorization.isComun, enrollmentController.getUserEnrolls)
    .post('/enrollment', JwtUtil.checkToken, Authorization.isComun, enrollmentController.enroll)
    // Admin

export { routes }