import { z } from "zod";

export const userUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
});

export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
