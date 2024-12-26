
import User from '../../model/user.model.js'
import AppError from '../utils/Error.js'


export const checkEmail=async(req,res,next)=>{
    const emailisExist=await User.findOne({email:req.body.email})
if(emailisExist){
    return next(new AppError('email is already Exist',409))
    }
    next()
    }