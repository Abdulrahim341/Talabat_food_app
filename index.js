import dbconnection from "./dbConnection/connection.js";
import express from "express";
import cors from "cors";
import bootstrab from "./src/bootstrab.js";
import Stripe from "stripe";
import asyncHandler from "./src/middleware/ascyncHandler.js";
import Order from "./model/order.model.js";
import Cart from "./model/cart.model.js";
import User from "./model/user.model.js";
const stripe = new Stripe(
process.env.STRIPE_KEY
  );


const app = express();
const port = process.env.PORT;

app.post(
  "api/vi/webhook",
  express.raw({ type: "application/json" }),
  asyncHandler(async (req, res) => {
    const sig = req.headers["stripe-signature"].toString();
    let event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.SIG_PASS
    );
    let checkout;
    if (event.type == "checkout.session.completed") {
      checkout = event.data.object;
      const user = await User.findOne({ email: checkout.customer_email });
      const cart = await Cart.findById(checkout.client_reference_id);
      if (!cart) next(new AppError("cart not found", 404));
      //2-total order price
      const totalOrderPrice =
        cart.totalCartPriceAfterDiscount || cart.totalCartPrice;
      //3- create order
      const order = new Order({
        user: user.id,
        orderItems: cart.cartItems,
        shippingAddress: checkout.metadata,
        totalOrderPrice: checkout.amount_total / 100,
        paymentType: "card",
        isPaid: true,
      });
      await order.save();
      // 4- clear user cart
      await Cart.findByIdAndDelete(cart._id);
    }
    res.json({ message: "success", checkout });
  })
);
app.use(cors());
app.use(express.json());

bootstrab(app, express);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
