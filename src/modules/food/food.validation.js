import joi from 'joi'

const foodSchema=joi.object({
mealName: joi.string().trim().required(),
description: joi.string().trim().required(),
price:joi.number().min(0).required(),
priceAfterDiscount:joi.number().min(0),
restaurant: joi.string().hex().length(24).required(),
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

export default foodSchema