
import asyncHandler from "../../middleware/ascyncHandler.js";
import Food from "../../../model/food.model.js";
import AppError from "../../utils/Error.js";
import fs from 'fs'
import path from 'path'

// add new food
export const addFood=asyncHandler(async(req,res,next)=>{
    if (req.file) req.body.image=req.file.filename
    const food=new Food(req.body)
    await food.save()
return res.status(201).json({message:'success',food,status:201})
})

//get all food
export const getAllFood=asyncHandler(async(req,res,next)=>{
    const food=await Food.find().populate('restaurant','restaurantName image')
    return food.length==0?
    next (new AppError('food not found',404)):
    res.status(201).json({message:'success',food,status:201})
})


// get specific food
export const getFood=asyncHandler(async(req,res,next)=>{
    const food=await Food.findById(req.params.id).populate('restaurant','restaurantName image')
    return !food?
    next (new AppError('food not found',404)):
    res.status(201).json({message:'success',food,status:201})
})


//update food
export const updateFood=asyncHandler(async(req,res,next)=>{
     // confirm there is no old photo
let destination = path.resolve("uploads/food");
let file = fs.readdirSync(destination);
const oldPhoto = await Food.findById(req.params.id);
if (file.includes(oldPhoto.image)) {
    // determine the path for the old image
    let imagePath = path.resolve(`uploads/food/${oldPhoto.image}`);
    // remove old image
    fs.unlinkSync(imagePath);
}
if (req.file) req.body.image=req.file.filename
    const food=await Food.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return !food?
    next (new AppError('food not found',404)):
    res.status(201).json({message:'success',food,status:201})
})

export const deleteFood=asyncHandler(async(req,res,next)=>{
 // confirm there is no old photo
let destination = path.resolve("uploads/food");
let file = fs.readdirSync(destination);
const oldPhoto = await Food.findById(req.params.id);
if (file.includes(oldPhoto.image)) {
    // determine the path for the old image
    let imagePath = path.resolve(`uploads/food/${oldPhoto.image}`);
    // remove old image
    fs.unlinkSync(imagePath);
}
const food=await Food.findByIdAndDelete(req.params.id)
return !food?
next (new AppError('food not found',404)):
res.status(201).json({message:'success',food,status:201})
})