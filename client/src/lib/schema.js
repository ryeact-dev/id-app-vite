import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
  username: z.string().trim().min(5, {
    message: 'Username must be at least 5 characters.',
  }),

  password: z.string().trim().min(1, {
    message: 'Password must not be empty.',
  }),
  // password: z
  //   .string()
  //   .transform((value) => value.replace(/\s+/g, ''))
  //   .pipe(z.string().min(1, { message: 'Password must not be empty.' })),
});

// User Schema
export const userSchema = z.object({
  username: z.string().trim().min(5, {
    message: 'Username must be at least 5 characters.',
  }),

  fullName: z.string().trim().min(1, {
    message: 'Full name must not be empty.',
  }),

  role: z.string().trim().min(1, {
    message: 'Role must not be empty.',
  }),

  email: z.string().trim().email({ message: 'Please provide a correct email' }),
});

// Student Schema
export const studentSchedma = z.object({
  idNumber: z.string().trim().min(6, {
    message: 'Id Number must be at least 6 numbers.',
  }),

  lastName: z.string().trim().min(1, {
    message: 'Last Name must not be empty.',
  }),

  firstName: z.string().trim().min(1, {
    message: 'First Name must not be empty.',
  }),

  middleInitial: z.string().trim().min(1, {
    message: 'MI ',
  }),

  fullAddress: z.string().trim().min(1, {
    message: 'Address must not be empty.',
  }),

  program: z.string().trim().min(1, {
    message: 'Address must not be empty.',
  }),

  birthDate: z.date({ message: 'Invalid date string.' }),
});

// School Year Schema
export const schoolYearSchema = z.object({
  syFrom: z
    .string()
    .trim()
    .min(4, {
      message: 'Year must contains only 4 numbers.',
    })
    .max(4, {
      message: 'Year must contains only 4 numbers.',
    }),

  syTo: z
    .string()
    .trim()
    .min(4, {
      message: 'Year must contains only 4 numbers.',
    })
    .max(4, {
      message: 'Year must contains only 4 numbers.',
    }),
});

// Department Schema
export const departmentSchema = z.object({
  department: z.string().trim().min(1, {
    message: 'Department must not be empty.',
  }),
});

// Program Schema
export const programSchema = z.object({
  program: z.string().trim().min(1, {
    message: 'Program must not be empty.',
  }),
  department: z.string().trim().min(1, {
    message: 'Department must not be empty.',
  }),
});
