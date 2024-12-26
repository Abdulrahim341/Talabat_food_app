import { Router } from "express";
import foodSchema from "./food.validation.js";
import * as foodController from './food.controller.js'
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";
import { customValidation, upload } from "../../middleware/fileUpload.js";
import validation from "../../middleware/validation.js";

const router=Router()
router.post('/create',protectedRoutes,allowedTO('admin','restaurantOwner'),upload(customValidation.images, "food").single("image"),validation(foodSchema),foodController.addFood)
        .get('/',foodController.getAllFood)
        .get('/:id',foodController.getFood)
        .patch('/:id',upload(customValidation.images, "food").single("image"),foodController.updateFood)
        .delete('/:id',foodController.deleteFood)



export default router