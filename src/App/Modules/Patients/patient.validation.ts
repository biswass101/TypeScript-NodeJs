import { z } from "zod";

const createPatientValidationSchema = z.object({
  body: z.object({
    age: z.number().optional(),
    gender: z
      .enum(["male", "female"], {
        errorMap: () => ({message: "Gender must be either 'male' or 'female'" })
      })
      .optional(),
    contactInfo: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const PatientValidations = {
  createPatientValidationSchema,
};
