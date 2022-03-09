import { CreateCategoryController } from "./controllers/CreateCategoryController";
import { GetAllCategoryController } from "./controllers/GetAllCategoriesController";
import { DeleteCategoryController } from "./controllers/DeleteCategoriesController";
import { UpdateCategoryController } from "./controllers/UpdateCategoriesController";
import { Router } from "express";
import { CreateVideoController } from "./controllers/CreateVideoController";
import { GetAllVideosController } from "./controllers/GetAllVideosController";

import { UserController } from "./controllers/UserController";

const userController = new UserController();

const routes = Router();

routes.post('/categories', new CreateCategoryController().handle);
routes.get('/categories', new GetAllCategoryController().handle);
routes.delete('/categories/:id', new DeleteCategoryController().handle);
routes.put('/categories/:id', new UpdateCategoryController().handle);

routes.post('/videos', new CreateVideoController().handle);
routes.get('/videos', new GetAllVideosController().handle);

routes.get('/users', userController.findUsers);
routes.get('/users/:id', userController.findUser);
routes.post('/users', userController.createUser);
routes.put('/users/:id', userController.updateUser);
routes.delete('/users/:id', userController.deleteUser);

export { routes }