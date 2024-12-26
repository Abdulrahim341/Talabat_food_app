import { Router } from "express";
import * as orderController from './order.controller.js'
import { allowedTO, protectedRoutes } from "../auth/auth.controller.js";
import { checkTime } from "../../middleware/checkTime.js";

const router=Router()
router.post('/:id',protectedRoutes,allowedTO('user'),orderController.createCashOrder)
        .get('/',protectedRoutes,allowedTO('user'),orderController.getUserOrders) 
        .get('/allorders',protectedRoutes,allowedTO('admin'),orderController.getAllOrders)
        .post('/checkout/:id',protectedRoutes,allowedTO('user'),orderController.createCheckoutSession)
        .put('/update',protectedRoutes,allowedTO('user','admin','restaurantOwner'),checkTime('update'),orderController.updateOrder)
        .delete('/delete',protectedRoutes,allowedTO('user','admin','restaurantOwner'),checkTime('delete'),orderController.deleteOrder)

export default router
