import { Router } from "express";
import * as cartController from './cart.controller.js'
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";


const router=Router()
router.post('/add',protectedRoutes,allowedTO('admin','user'),cartController.addToCart)
        .get('/',protectedRoutes,allowedTO('admin','user'),cartController.getLoggedUserCart)
        .patch('/:id',protectedRoutes,allowedTO('admin','user'),cartController.updateQuantity)
        .delete('/:id',protectedRoutes,allowedTO('admin','user'),cartController.removeFromCart)
        .delete('/',protectedRoutes,allowedTO('admin','user'),cartController.clearUserCart)

export default router

