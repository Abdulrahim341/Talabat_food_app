import { Router } from "express"
import * as userController from './user.controller.js'
import { checkEmail } from "../../middleware/checkEmail.js"
import validation from "../../middleware/validation.js"
import userSchema from "./user.validation.js"

const router=Router()
router.post('/add',validation(userSchema),checkEmail,userController.addUser)
        .get('/',userController.getUsers)
        .get('/:id',userController.getUser)
        .post('/:id',userController.updateUser)
        .delete('/:id',userController.deleteUser)
export default router