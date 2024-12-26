
import asyncHandler from "../../middleware/ascyncHandler.js";
import AppError from "../../utils/Error.js";
import fs from 'fs'
import path from 'path'
import Menu from "../../../model/menu.model.js";


// add menu
export const addMenu=asyncHandler(async(req,res,next)=>{
    const menu=new Menu(req.body)
    await menu.save()
    return res.status(201).json({message:"success",menu,status:201})
})

// get menu
export const getAllMenu=asyncHandler(async(req,res,next)=>{
    const menu=await Menu.find().populate('restaurant',"restaurantName image").populate('food',"mealName image")
    return !menu?
    next (new AppError('menu not found')):
    res.status(201).json({message:'success',menu,status:201})
})

// get specific menu
export const getMenu=asyncHandler(async(req,res,next)=>{
    const menu=await Menu.findById(req.params.id).populate('restaurant',"restaurantName image").populate('food',"mealName image")
    return !menu?
    next (new AppError('menu not found')):
    res.status(201).json({message:'success',menu,status:201})
})

//update menu
export const updateMenu=asyncHandler(async(req,res,next)=>{
    const menu=await Menu.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return !menu?
    next (new AppError('menu not found')):
    res.status(201).json({message:'success',menu,status:201})
})


// delete menu
export const deleteMenu=asyncHandler(async(req,res,next)=>{
    const menu=await Menu.findByIdAndDelete(req.params.id,{new:true})
    return !menu?
    next (new AppError('menu not found')):
    res.status(201).json({message:'success',menu,status:201})
})

