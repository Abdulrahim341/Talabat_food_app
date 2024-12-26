import AppError from "../utils/Error.js"



const validation=(Schema)=>{
    return(req,res,next)=>{
        let inputData={...req.body,...req.params,...req.query}
        if(req.file){
            inputData.file={...req.file}
        }
        if(req.files){
            inputData.files={...req.files}
        }
        const {error} =Schema.validate(inputData,{abortEarly:true})
        if(error){
            const errMsgs=error.details.map(err=>err.message)
            return next(new AppError(errMsgs,401))
        }
        return next()
    }
}
export default validation