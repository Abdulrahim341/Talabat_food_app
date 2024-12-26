
import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    user:{
        type:Types.ObjectId,
        required:[true,'user is required'],
        ref:'User'
    },
    cartItems:[{
        food:{
            type:Types.ObjectId,
            // required:[true,'food is required'],
            ref:'Food'
        },
        quantity:{
            type:Number,
            default:1
        },
        price:Number,
    }],
    
    totalCartPrice:Number,
    discount:{
        type:Number,
        default:0
    },
    totalCartPriceAfterDiscount:Number
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const Cart = model("Cart", schema);
export default Cart;
