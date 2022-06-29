import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { EventController } from "./controllers/EventController";
import { EnrollmentController } from "./controllers/EnrollmentController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { AdminController } from "./controllers/AdminController";
import { JwtUtil } from './config/JwtUtil';
import Authorization from './config/authorizationUtils';

const userController = new UserController();
const eventController = new EventController();
const enrollmentController = new EnrollmentController();
const authenticationController = new AuthenticationController();
const adminController = new AdminController();

const routes = Router();

    //Authentication
    routes.post('/login', authenticationController.login)
    .post('/logout', JwtUtil.checkToken, authenticationController.logout)
    // User
    .get('/users', userController.findUsers)
    .post('/users', userController.createUser)
    .get('/user', JwtUtil.checkToken, userController.findUser)
    .put('/users', JwtUtil.checkToken, userController.updateUser)
    .delete('/users', JwtUtil.checkToken, userController.deleteUser)
    // Events
    .get('/events', eventController.findAll)
    .get('/events/users', JwtUtil.checkToken, Authorization.isEnterprise, eventController.findEventByUser)
    .get('/events/:id', eventController.findOne)
    .post('/events', JwtUtil.checkToken, Authorization.isEnterprise, eventController.create)
    .put('/events', JwtUtil.checkToken, Authorization.isEnterprise, eventController.update)
    .delete('/events/:id', JwtUtil.checkToken, Authorization.isEnterprise, eventController.delete)
    // Events - Videos
    .post('/events/videos', JwtUtil.checkToken, Authorization.isEnterprise, eventController.addVideo )
    .delete('/events/videos/:idVideo', JwtUtil.checkToken, Authorization.isEnterprise, eventController.deleteVideo )
    // Enrollment 
    .get('/enrollments/events/:eventId',  JwtUtil.checkToken, Authorization.isEnterprise, enrollmentController.getParticipantsByIdEvent)
    .get('/enrollments/', JwtUtil.checkToken, Authorization.isComun, enrollmentController.getUserEnrolls)
    .post('/enrollments/:idEvent', JwtUtil.checkToken, Authorization.isComun, enrollmentController.enroll)
    .post('/enrollments/', JwtUtil.checkToken, Authorization.isEnterprise, enrollmentController.validate)
    // Admin
    .get('/admin/users',  JwtUtil.checkToken, Authorization.isAdmin, adminController.getAllUsers)
    .patch('/admin/users/active/:userId',  JwtUtil.checkToken, Authorization.isAdmin, adminController.activateUser)
    .patch('/admin/users/:userId',  JwtUtil.checkToken, Authorization.isAdmin, adminController.makeUserAdmin)
    .delete('/admin/users/:userId',  JwtUtil.checkToken, Authorization.isAdmin, adminController.activateUser)
    .get('/admin/events',  JwtUtil.checkToken, Authorization.isAdmin, adminController.getAllEvents)
    .delete('/admin/events/:eventId',  JwtUtil.checkToken, Authorization.isAdmin, adminController.getAllUsers)
    
export { routes }