import * as z from 'zod';
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js';


export const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" }
] as const;

// Zod 4 requires a non-empty tuple for enums
const genderOptionsValues = genderOptions.map(option => option.value) as [string, ...string[]];

export const contactSchema = z.object({
    // Standardized Zod 4 'error' parameter for custom messages
    gender: z.enum(genderOptionsValues, {
        error: "Please select a valid gender"
    }),

    // Custom error function to handle required vs type mismatch
    firstName: z.string({
        error: (issue) => issue.input === undefined ? "First name is required" : "First name must be a string"
    }).min(1, "First name must be at least 1 character long"),

    lastName: z.string({
        error: (issue) => issue.input === undefined ? "Last name is required" : "Last name must be a string"
    }).min(1, "Last name must be at least 1 character long"),

    // Zod 4 uses top-level z.email() for better tree-shaking
    email: z.email("Invalid email address").toLowerCase().trim(),

    phoneNumber: z.string({
        error: (issue) => issue.input === undefined ? "Phone number is required" : "Phone number must be a string"
    })
    // REPLACING .preprocess: transform input first, then .pipe to validate
    .transform((val) => val.replace(/[\s-]/g, "")) 
    .pipe(
        z.string()
            .min(7, "Phone number must be at least 7 characters long")
            .max(15, "Phone number must be at most 15 characters long")
            .refine((val) => isValidPhoneNumber(val, "ID"), {
                error: "Invalid Indonesian phone number"
            })
    )
    // Final transform to international E.164 format for your database
    .transform((val) => {
        const phoneNumber = parsePhoneNumberFromString(val, "ID");
        return phoneNumber?.number as string;
    }),

    message: z.string({
        error: (issue) => issue.input === undefined ? "Message is required" : "Message must be a string"
    })
    .min(10, "Message must be at least 10 characters long")
    .max(500, "Message must be at most 500 characters long")
});

export type ContactFormValues = z.infer<typeof contactSchema>;