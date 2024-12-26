
import { model, Schema, Types } from "mongoose";
// import bcrybt from "bcrypt";

const schema = new Schema(
  {
    restaurantName: {
      type: String,
      required: [true, "restaurantName is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image:String,
    restaurantOwner:{
        type:Types.ObjectId,
        required:[true,'restaurantOwner is required'],
        ref:'User'
    },
    rateCount:{
      type:Number,
      min:[0,'min rateCount is 0'],
      default:0
  },
  rateAverage:{
      type:Number,
      min:[0,'min rateAverage is 0'],
      default:0
  }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.post('init', (doc) =>{
  if(doc.image){
  doc.image = process.env.BASE_URL+`restaurant/` + doc.image   
  }
  
})

const Restaurant = model("Restaurant", schema);
export default Restaurant;
