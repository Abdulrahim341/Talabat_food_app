import multer from "multer";
import fs from 'fs'
import {v4 as uuidv4}  from 'uuid'
import  AppError from "../utils/Error.js";


export const customValidation={
    images:['image/png','image/jpeg','image/jpg']
}

export const upload = (customValidation,folderName)=>{
    if(!fs.existsSync(`./uploads/${folderName}`)){
        fs.mkdirSync(`./uploads/${folderName}`)
    }
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,`uploads/${folderName}`)
    },
    filename:function(req,file,cb){
        cb(null,uuidv4() + '_' + file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if(customValidation.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new AppError('invalid format',400))
    }
}
const upload = multer({ storage,fileFilter,limits:{
    fileSize:1*1024*1024
}
})  
return upload
}

