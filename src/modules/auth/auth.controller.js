import jwt from "jsonwebtoken";
import bcrybt from "bcrypt";
import User from "../../../model/user.model.js";
import asyncHandler from "../../middleware/ascyncHandler.js";
import AppError from "../../utils/Error.js";
import sendEmail from "../../utils/sendEmail.js";
import { customAlphabet } from "nanoid";

//      signUP
export const signUp=asyncHandler(async(req,res,next)=>{
const OTP =customAlphabet('0123456789',4)
const user=new User(req.body)
await user.save()
const {email}=req.body
//      sendEmail to confirm
sendEmail({to:email,html:`<h1>${req.body.OTP}</h1>`})
    const token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    return res.status(201).json({message:'success',user,token})
})

//       confirmEmail
export const confirmEmail=asyncHandler(async(req,res,next)=>{
    const {OTP,email}=req.body
    const userExist=await User.findOne({email})
    if(!userExist){
        return next (new AppError("invalid Email",401))
    }if(OTP){
        if(userExist.OTP=OTP){
        await User.updateOne({email},{confirmEmail:true,OTP:null}) 
        return res.status(200).json({message:"Email confirmed",status:200})
    }
    }else{
    return next (new AppError('invalid OTP',401))    
    }
})

//      sign In
export const signIn=asyncHandler(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
if(!user.confirmEmail){
    next (new AppError('please confirm email',409))
}
//       check userExist&password
if(user&&bcrybt.hashSync(req.body.password,user.password)){
    const token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    return res.json({ message: "success", token });
}else{
    next (new AppError('invalid email or password',401))
}
})

//       change User Password
export const changeUserPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
//       check user&password and hashPassword
    if (user &&bcrybt.hashSync(req.body.password,user.password)) {
        const newPassword=req.body.newPassword
        const password = bcrybt.hashSync(newPassword, 8)
//       update new password
    await User.findOneAndUpdate(
        { email: req.body.email },
        { password, passwordchangedAt: Date.now() }
    );
    const token = jwt.sign({ userId: user._id, role: user.role },process.env.JWT_KEY);
    return res.json({ message: "password changed successfuly", token });
    }
    next(new AppError("incorrect email or password", 401));
});

//      protectRoutes
export const protectedRoutes = asyncHandler(async (req, res, next) => {
    let { token } = req.headers;
    let userPayload = null;
//      check if token is provided
    if (!token) return next(new AppError("token not provided", 401));
//      verify token
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
      if (err) return next(new AppError(err, 401));
      userPayload = payload;
    });
//      check userId in token
    let user = await User.findById(userPayload.userId);
    if (!user) return next(new AppError("user not found", 401));
//      check the time of change of password
    if (user.passwordchangedAt) {
      let time = parseInt(user.passwordchangedAt.getTime() / 1000);
      if (time > userPayload.iat)
        return next(new AppError("invalid token...logIn again", 401));
    }
    req.user = user;
    next();
  });
  //     Authorization with allowed to
  export const allowedTO = (...roles) => {
    return asyncHandler(async (req, res, next) => {
      if (roles.includes(req.user.role)) {
        return next();
      }
      return next(
        new AppError("you not authorized to access this endpoint", 401)
      );
    });
  };
  