import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  username: z.string().trim().min(5, {
    message: "Username must be at least 5 characters.",
  }),

  password: z.string().trim().min(1, {
    message: "Password must not be empty.",
  }),
  // password: z
  //   .string()
  //   .transform((value) => value.replace(/\s+/g, ''))
  //   .pipe(z.string().min(1, { message: 'Password must not be empty.' })),
});

// User Schema
export const userSchema = z.object({
  username: z.string().trim().min(5, {
    message: "Username must be at least 5 characters.",
  }),

  fullName: z.string().trim().min(1, {
    message: "Full name must not be empty.",
  }),

  role: z.string().trim().min(1, {
    message: "Role must not be empty.",
  }),

  email: z
    .string()
    .email({ message: "Please provide a correct email" })
    .min(5, { message: "Email must not be empty." }),
});

// Student Schema
export const studentSchedma = z.object({
  studentIdNumber: z.string().trim().min(6, {
    message: "Id Number must be at least 6 numbers.",
  }),

  lastName: z.string().trim().min(1, {
    message: "Last Name must not be empty.",
  }),

  firstName: z.string().trim().min(1, {
    message: "First Name must not be empty.",
  }),

  middleInitial: z.string().trim().min(1, {
    message: "MI must not be empty.",
  }),

  programId: z.string().trim().min(1, {
    message: "Program must not be empty.",
  }),

  birthDate: z.date({ message: "Invalid date string." }),

  address: z.string().trim().min(1, {
    message: "Address must not be empty.",
  }),

  guardian: z.string().trim().min(1, {
    message: "Guardian name must not be empty.",
  }),

  guardianContact: z.string().trim().min(1, {
    message: "Guardian Address must not be empty.",
  }),
});

// School Year Schema
export const schoolYearSchema = z.object({
  schoolYearFrom: z
    .string()
    .trim()
    .min(4, {
      message: "Year must contains only 4 numbers.",
    })
    .max(4, {
      message: "Year must contains only 4 numbers.",
    }),

  schoolYearTo: z
    .string()
    .trim()
    .min(4, {
      message: "Year must contains only 4 numbers.",
    })
    .max(4, {
      message: "Year must contains only 4 numbers.",
    }),
});

// Department Schema
export const departmentSchema = z.object({
  departmentName: z.string().trim().min(1, {
    message: "Department must not be empty.",
  }),
});

// Program Schema
export const programSchema = z.object({
  programName: z.string().trim().min(1, {
    message: "Program must not be empty.",
  }),
  departmentId: z.string().trim().min(1, {
    message: "Department must not be empty.",
  }),
});

// It Required Input of a combination of Numbers & Strings also length must be greater than 6...
// example: 123456s | abc123 | 123abc
const passwordRules = /^(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,})$/;

// Update Password Schema
export const updateUserPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(1, { message: "Password is required" }),
    newPassword: z
      .string()
      .trim()
      .min(8)
      .regex(passwordRules, "Must contain letter & numbers [min of 8 chars]")
      .min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
