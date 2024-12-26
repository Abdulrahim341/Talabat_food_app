import AppError from "../utils/Error.js"

const asyncHandler=(fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch((error)=>{
            // return res.status(500).json({message:'catch error',error:error.message})
            return next(new AppError('catch error',error.message,500))

            next(error)
        })
    }
}
export default asyncHandler


