import User from "../../../model/user.model.js";
import asyncHandler from "../../middleware/ascyncHandler.js";
import AppError from "../../utils/Error.js";

//    add user
export const addUser=asyncHandler(async(req,res,next)=>{
    const user=new User(req.body)
    await user.save()
    return res.status(201).json({message:"user added successfuly",user,status:201})
})

//    get all users
export const getUsers=asyncHandler(async(req,res,next)=>{
    const users=await User.find()
    return users.length==0?
    next (new AppError('users not found',404)):
    res.status(200).json({message:' success',users,status:200})
})

//  get spesfic user 
export const getUser=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    return !user?
    next (new AppError('user not found',404)):
    res.status(200).json({message:'success',user,status:200})
})

//   update user
export const updateUser=asyncHandler(async(req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return !user?
    next (new AppError('user not found',404)):
    res.status(200).json({message:'user updated successfuly',user,status:200})
})

//   delete user
export const deleteUser=asyncHandler(async(req,res,next)=>{
    const user=await User.findByIdAndDelete(req.params.id)
    return !user?
    next (new AppError('user not found',404)):
    res.status(200).json({message:'user deleted successfuly',user,status:200})
})