import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
    id: z.string(),
    full_name: z.string(),
    username: z.string(),
    email: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const userFormSchema = z.object({
    firstname: z.string({
        required_error: 'First name is required',
        invalid_type_error: 'First name must be a string',
    }),
    middlename: z.string({
        required_error: 'Middle name is required',
        invalid_type_error: 'Middle name must be a string',
    }),
    lastname: z.string({
        required_error: 'Last name is required',
        invalid_type_error: 'Last name must be a string',
    }),
    username: z.string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string',
    }),
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .min(10)
        .regex(/[a-z]/, 'Password must contain a lowercase letter')
        .regex(/[A-Z]/, 'Password must contain an uppercase letter')
        .regex(/[0-9]/, 'Password must contain a number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain a special character'),
    retype_password: z.string({
        required_error: 'Retype Password is required',
    }),
}).refine((data)=>data.retype_password === data.password, {
    path: ["retype_password"],
    message: "Passwords do not match"
});

export type UserForm = z.infer<typeof userFormSchema>;
