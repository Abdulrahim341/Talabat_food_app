import Cart from "../../../model/cart.model.js";
import Order from "../../../model/order.model.js";
import asyncHandler from "../../middleware/ascyncHandler.js";
import AppError from "../../utils/Error.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY)


//         create cash order
export const createCashOrder = asyncHandler(async (req, res, next) => {
  //    1-get user cart by cartId
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) next(new AppError("cart not found", 404));
  //    2-  total order price
  const totalOrderPrice =
    cart.totalCartPriceAfterDiscount || cart.totalCartPrice;
  //    3- create order
  const order = new Order({
    user: req.user.id,
    orderItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });
  await order.save();
  //    4-clear user cart
  await Cart.findByIdAndDelete(cart._id);
  return res.status(201).json({ message: "success", order, status: 201 });
});

//      get user orders
export const getUserOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.findOne({ user: req.user.id }).populate(
    "orderItems.food"
  );
  return !orders?
    next(new AppError("user not have any orders")):
    res.status(201).json({ message: "success", orders, status: 201 });
});

//      get all orders
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  return !orders?
    next(new AppError("orders not found")):
    res.status(201).json({ message: "success", orders, status: 201 });
});

//    update order
export const updateOrder=asyncHandler(async(req,res,next)=>{
  const order=await Order.findOneAndUpdate({user:req.user._id},req.body,{new:true})
  return !order?
    next(new AppError("order not found")):
    res.status(201).json({ message: "order updated successfuly", order, status: 201 });
})
//      delete order
export const deleteOrder=asyncHandler(async(req,res,next)=>{
  const order=await Order.findOneAndDelete({user:req.user._id},{new:true})
  return !order?
    next(new AppError("order not found")):
    res.status(201).json({ message: "order deleted successfuly", order, status: 201 });
})
//      create checkout session
export const createCheckoutSession = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) next(new AppError("cart not found", 404));
  const totalOrderPrice =
    cart.totalCartPriceAfterDiscount || cart.totalCartPrice;
const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.firstName,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://hambozoo.netlify.app/#/orders",
    cancel_url: "https://hambozoo.netlify.app/#/cart",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });
  res.json({ message: "success", session });
});
