import joi from 'joi'

const restaurantSchema=joi.object({
restaurantName: joi.string().trim().required(),
description: joi.string().trim().required(),
rateCount:joi.number().min(0).default(0),
rateAverage:joi.number().min(0).default(0),
restaurantOwner: joi.string().hex().length(24).required(),
file:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required()
    }),
})

export default restaurantSchema