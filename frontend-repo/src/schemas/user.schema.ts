import { z } from "zod";

export const userUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  totalAverageWeightRatings: z
    .string()
    .nullable()
    .refine(
      (val) => {
        const num = parseFloat(val as string);
        return (
          num === null || (typeof num === "number" && num >= 0 && num <= 5)
        );
      },
      {
        message: "Rating must be between 0 and 5",
      }
    ),
  numberOfRents: z
    .string()
    .nullable()
    .refine(
      (val) => {
        const num = parseFloat(val as string);
        return num === null || (typeof num === "number" && num >= 0 && num <= 9999);
      },
      {
        message: "Number of rents must be between 0 and 9999",
      }
    ),
  recentlyActive: z.number().nullable(),
});

export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

