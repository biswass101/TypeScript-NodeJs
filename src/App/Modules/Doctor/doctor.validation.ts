import { z } from "zod";



const createDoctorValidationSchema = z.object({
  body: z.object({
    specialization: z.string().optional(),
    availability: z.boolean().optional(),
    gender: z
      .enum(["male", "female"], {
        errorMap: () => ({message: "Gender must be either 'male' or 'female'" })
      })
      .optional(),
    contactInfo: z.string().optional(),
  }),
});

export const DoctorValidations = {
  createDoctorValidationSchema,
};
