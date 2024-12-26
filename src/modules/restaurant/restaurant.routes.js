import { Router } from "express";
import * as restaurantController from './restaurant.controller.js'
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";
import { customValidation, upload } from "../../middleware/fileUpload.js";
import validation from "../../middleware/validation.js";
import restaurantSchema from "./restaurant.validation.js";

const router=Router()
router.post('/create',protectedRoutes,allowedTO('admin','restaurantOwner'),upload(customValidation.images, "restaurant").single("image"),validation(restaurantSchema),restaurantController.addRestaurant)
        .get('/',restaurantController.getAllRestaurants)
        .get('/:id',restaurantController.getRestaurant)
        .patch('/:id',upload(customValidation.images, "restaurant").single("image"),restaurantController.updateRestaurant)
        .delete('/:id',restaurantController.deleteRestaurant)



export default router