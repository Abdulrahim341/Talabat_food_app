import { Router } from "express";
import * as authController from './auth.controller.js'
import validation from "../../middleware/validation.js";
import userSchema from "../user/user.validation.js";
import { checkEmail } from "../../middleware/checkEmail.js";


const router=Router()
router.post("/signUp",validation(userSchema),checkEmail,authController.signUp)
        .patch('/confirm',authController.confirmEmail)
        .post("/signIn",authController.signIn)
        .patch("/changeUserPassword",authController.changeUserPassword)


export default router