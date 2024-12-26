
import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    orderItems:[
        {
        food:{
            type:Types.ObjectId,
            ref:'Food'
        },
        quantity:Number,
        price:Number,
        }
    ],
    totalOrderPrice:Number,
    user:{
        type:Types.ObjectId,
        required:[true,'user is required'],
        ref:'User'
    },
    shippingAddress:{
        city:String,
        street:String,
        phoneNo:String
    },
    paymentType:{
        type:String,
        enum:['cash','card'],
        default:'cash'
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    deliveredAt:Date,
    totalPrice:Number
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const Order = model("Order", schema);
export default Order;
