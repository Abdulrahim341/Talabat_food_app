import mongoose from "mongoose";
import Cart from "../../../model/cart.model.js";
import Food from "../../../model/food.model.js";
import asyncHandler from "../../middleware/ascyncHandler.js";
import AppError from "../../utils/Error.js";


function calcTotalPrice(cart) {
  cart.totalCartPrice = cart.cartItems.reduce(
    (prev, item) => (prev += item.quantity * item.price),
    0
  );
  if (cart.discount) {
    cart.totalCartPriceAfterDiscount =
    cart.totalCartPrice - (cart.totalCartPrice * cart.discount) / 100;
  }
}

// add to cart
export const addToCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  const food = await Food.findById(req.body.food);
  if (!food) return next(new AppError("food not found", 404));
  req.body.price = food.price;
  if (!cart) {
    const cart = new Cart({
      user: req.user._id,
      cartItems:[req.body],
      discount: req.body.discount,
    });
    const totalCartPrice = calcTotalPrice(cart);
    await cart.save();
    return res.status(201).json({ message: "success", cart, status: 201 });
  } else {
    cart.cartItems.push(req.body)
        calcTotalPrice(cart)
        await cart.save()
    return res
      .status(200)
      .json({ message: "success added to cart", cart, status: 200 });
  }
});

// update quantity
export const updateQuantity=asyncHandler(async(req,res,next)=>{
  const cart=await Cart.findOne({user:req.user._id})
  const item=cart.cartItems.find(item=>item.food==req.params.id)
  if(!item) next(new AppError('food not found',404))
    item.quantity=req.body.quantity
  calcTotalPrice(cart)
  await cart.save()
  return res
      .status(200)
      .json({ message: "success", cart, status: 200 });
})
  
//remove from cart 
export const removeFromCart=asyncHandler(async(req,res,next)=>{
  const cart=await Cart.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
calcTotalPrice(cart)
await cart.save()
return !cart?
next (new AppError('cart not found',404)):
res.status(201).json({message:'cart deleted sussfuly',cart,status:201})
})

// get logged user carts
export const getLoggedUserCart=asyncHandler(async(req,res,next)=>{
  const cart=await Cart.findOne({user:req.user._id})
return !cart?
next (new AppError('cart not found',404)):
res.status(201).json({message:'success',cart,status:201})
})

// clear user cart
export const clearUserCart=asyncHandler(async(req,res,next)=>{
  const cart=await Cart.findOneAndDelete({user:req.user._id})
  return !cart?
next (new AppError('cart not found',404)):
res.status(201).json({message:'success',cart,status:201})
})