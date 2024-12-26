
import path from "path";
import fs from "fs";
import Restaurant from "../../../model/restaurant.model.js";
import asyncHandler from "../../middleware/ascyncHandler.js";
import AppError from "../../utils/Error.js";


// add new restaurant 
export const addRestaurant=asyncHandler(async(req,res,next)=>{
    if (req.file) req.body.image=req.file.filename
    const restaurant=new Restaurant(req.body)
    await restaurant.save()
    return res.status(201).json({message:'restaurant created',restaurant,status:201})
})

// get all restaurants
export const getAllRestaurants=asyncHandler(async(req,res,next)=>{
    const restaurants = await Restaurant.find().populate("restaurantOwner","_id firstName email")
    return restaurants.length==0?
    next (new AppError('restaurants not found',404)):
    res.status(200).json({message:'success',restaurants,status:200})
})

// get specific restaurant
export const getRestaurant=asyncHandler(async(req,res,next)=>{
    const restaurant=await Restaurant.findById(req.params.id).populate("restaurantOwner","_id firstName email")
    return !restaurant?
    next (new AppError('restaurant not found',404)):
    res.status(200).json({message:'success',restaurant,status:200})
})

// update restaurant
export const updateRestaurant=asyncHandler(async(req,res,next)=>{
 // confirm there is no old photo
let destination = path.resolve("uploads/restaurant");
let file = fs.readdirSync(destination);

const oldPhoto = await Restaurant.findById(req.params.id);

if (file.includes(oldPhoto.image)) {
    // determine the path for the old image
    let imagePath = path.resolve(`uploads/restaurant/${oldPhoto.image}`);

    // remove old image
    fs.unlinkSync(imagePath);
}
req.body.image=req.file.filename
const restaurant=await Restaurant.findByIdAndUpdate(req.params.id,req.body,{new:true})
return !restaurant?
    next (new AppError('restaurant not found',404)):
    res.status(200).json({message:'success',restaurant,status:200})
})

//deleting restaurant
export const deleteRestaurant=asyncHandler(async(req,res,next)=>{
  // confirm there is no old photo
let destination = path.resolve("uploads/restaurant");
let file = fs.readdirSync(destination);

const oldPhoto = await Restaurant.findById(req.params.id);

if (file.includes(oldPhoto.image)) {
    // determine the path for the old image
    let imagePath = path.resolve(`uploads/restaurant/${oldPhoto.image}`);

    // remove old image
    fs.unlinkSync(imagePath);
}
const restaurant=await Restaurant.findByIdAndDelete(req.params.id,{new:true})
return !restaurant?
    next (new AppError('restaurant not found',404)):
    res.status(200).json({message:'success',restaurant,status:200})
})
