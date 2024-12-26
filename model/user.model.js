import { model, Schema } from "mongoose";
import bcrybt from "bcrypt";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    email: {
      type: String,
      unique: [true, "email must be unique"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    OTP: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["admin", "user", "restaurantOwner"],
      required: [true, "role is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function () {
this.password = bcrybt.hashSync(this.password, 8);
this.confirmPassword=bcrybt.hashSync(this.confirmPassword, 8);
});

const User = model("User", userSchema);
export default User;
