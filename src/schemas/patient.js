import z from 'zod'

const patientSchema = z.object({
  name: z.string(),
  surname: z.string(),
  dni: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  phone: z.string(),
  email: z.string().email(),
  tutor: z.string(),
  comments: z.string(),
})

export function validatePatient (input) {
  return patientSchema.safeParse(input)
}

export function validatePartialPatient (input) {
  return patientSchema.partial().safeParse(input)
}