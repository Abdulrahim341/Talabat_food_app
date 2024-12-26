
import globalError from "./middleware/globalError.js";
import authRouter from './modules/auth/auth.routes.js'
import userRouter from './modules/user/user.routes.js'
import restaurantRouter from './modules/restaurant/restaurant.routes.js'
import foodRouter from './modules/food/food.routes.js'
import menuRouter from './modules/menu/menu.routes.js'
import cartRouter from './modules/cart/cart.routes.js'
import orderRouter from './modules/order/order.routes.js'


const bootstrab=(app,express)=>{
    process.on('uncaughtException',(err)=>{
        console.log(err);
        console.log('error in code',err.details);
    })
    app.use(express.json())
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/restaurant", restaurantRouter);
    app.use("/food", foodRouter);
    app.use("/menu", menuRouter);
    app.use("/cart", cartRouter);
    app.use("/order", orderRouter);

    app.use('*',(_,res)=>{
        return res.json ({message:'not found'})
    })
    process.on('unhandledRejection',(err)=>{
        console.log('error',err);
    })
    app.use(globalError)
}
export default bootstrab