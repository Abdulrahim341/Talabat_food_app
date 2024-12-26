import joi from 'joi'

const userSchema=joi.object({
    firstName: joi.string().trim().required(),
    lastName: joi.string().trim().required(),
    email: joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
    password: joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
    confirmPassword:joi.string().valid(joi.ref('password')).required(),
    role: joi.string().valid('user', 'admin','restaurantOwner'),
    OTP:joi.number()
})

export default userSchema