
import { model, Schema, Types } from "mongoose";


const schema = new Schema(
  {
    mealName: {
      type: String,
      required: [true, "mealName is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image:String,
    restaurant:{
        type:Types.ObjectId,
        required:[true,'restaurantOwner is required'],
        ref:'Restaurant'
    },
    price:{
        type:Number,
        required:[true,'price is required'],
        min:[0,'min price is 0']
    },
    priceAfterDiscount:{
        type:Number,
        min:[0,'min price is 0']
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.post('init', (doc) =>{
  if(doc.image){
  doc.image = process.env.BASE_URL+`food/` + doc.image   
  }
  
})

const Food = model("Food", schema);
export default Food;
