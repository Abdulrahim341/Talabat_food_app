import joi from 'joi'

const menuSchema=joi.object({
restaurant: joi.string().hex().length(24).required(),
food: joi.string().hex().length(24).required(),

})

export default menuSchema