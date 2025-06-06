import { z } from 'zod'

const createStaffValidationSchema = z.object({
    body: z.object({
        contactInfo: z.string().optional(),
        department: z.string().optional()
    })
})

export const StaffValidations = {
  createStaffValidationSchema,
};