import { z } from 'zod'

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({required_error: "Email is required"}),
        password: z.string({required_error: "Password is required"})
    })
})

const chnagePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({required_error: "Old Password is required"}),
        newPassword: z.string({required_error: "New Password is required"})
    })
})

export const AuthValidations = {
    loginValidationSchema,
    chnagePasswordValidationSchema
}