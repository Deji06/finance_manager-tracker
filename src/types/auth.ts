
import {z} from 'zod'

export const signUpSchema = z.object({
  username: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password is required"),
});


export type signUpFormData = z.infer<typeof signUpSchema>
export type signInFormData = z.infer<typeof signInSchema>