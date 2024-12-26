import { Router } from "express";
import menuSchema from './menu.validation.js'
import * as menuController from './menu.controller.js'
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";
import { customValidation, upload } from "../../middleware/fileUpload.js";
import validation from "../../middleware/validation.js";

const router=Router()
router.post('/add',protectedRoutes,allowedTO('admin','restaurantOwner'),validation(menuSchema),menuController.addMenu)
        .get('/',menuController.getAllMenu)
        .get('/:id',menuController.getMenu)
        .patch('/:id',menuController.updateMenu)
        .delete('/:id',menuController.deleteMenu)



export default router