
import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    food:{
        type:Types.ObjectId,
        required:[true,'food is required'],
        ref:'Food'
    },
    restaurant:{
        type:Types.ObjectId,
        required:[true,'restaurant is required'],
        ref:'Restaurant'
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const Menu = model("Menu", schema);
export default Menu;
