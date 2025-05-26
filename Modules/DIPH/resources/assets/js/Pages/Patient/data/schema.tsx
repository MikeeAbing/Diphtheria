import { z } from 'zod';

// Regex for strict YYYY-MM-DD format
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Age calculation helper
function calculateAgeComponents(dob: Date) {
    const now = new Date();
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
        months -= 1;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    const diffTime = Math.abs(now.getTime() - dob.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;

    return {
        ageInYears: years,
        ageInMonths: totalMonths,
        ageInDays: totalDays,
    };
}

export const patientFormSchema = z
    .object({
        firstname: z.string().max(50),
        middlename: z.string().max(50),
        lastname: z.string().max(50),
        suffixname: z.string().max(5).optional(),
        sex: z.enum(['M', 'F']),
        dateofbirth: z.string().regex(dateRegex, {
            message: 'Date must be in YYYY-MM-DD format',
        }),
        ageinyears: z
            .number()
            .int()
            .min(-2147483648, { message: 'Value must be >= -2,147,483,648' })
            .max(2147483647, { message: 'Value must be <= 2,147,483,647' }),
        ageinmonths: z
            .number()
            .int()
            .min(-2147483648, { message: 'Value must be >= -2,147,483,648' })
            .max(2147483647, { message: 'Value must be <= 2,147,483,647' }),
        ageindays: z
            .number()
            .int()
            .min(-2147483648, { message: 'Value must be >= -2,147,483,648' })
            .max(2147483647, { message: 'Value must be <= 2,147,483,647' }),
        member_of_IP: z.enum(['Y', 'N'], {
            invalid_type_error: 'Must be of type string',
            required_error: 'Must choose whether patient is an indigenous person or not',
        }),
        IP_tribe: z.coerce.number({ message: 'Must be an integer' }).min(1).max(33).optional(),
        IP_tribe_specify: z.string({ invalid_type_error: 'Must be of type string' }).max(255).optional(),
        pat_address_reg: z.string({ invalid_type_error: 'Must be of type string' }).min(0).max(10).optional(),
        pat_address_prov: z.string({ invalid_type_error: 'Must be of type string' }).min(0).max(10).optional(),
        pat_address_city: z.string({ invalid_type_error: 'Must be of type string' }).min(0).max(255).optional(),
        pat_address_brgy: z.string({ invalid_type_error: 'Must be of type string' }).min(0).max(255).optional(),
        pat_address_street_name: z.string({ invalid_type_error: 'Must be of type string' }).max(255).optional(),
        pat_perm_address_reg: z.string({ invalid_type_error: 'Must be of type string' }).min(0).max(255).optional(),
        pat_perm_address_prov: z.string({ invalid_type_error: 'Must be of type string' }).min(0).max(255).optional(),
        pat_perm_address_city: z.string({ invalid_type_error: 'Must be of type string' }).min(0).max(255).optional(),
        pat_perm_address_brgy: z.string({ invalid_type_error: 'Must be of type string' }).min(0).max(255).optional(),
        pat_perm_address_street_name: z.string({ invalid_type_error: 'Must be of type string' }).max(255).optional(),
        facilityname: z.string().max(150),
        occupation: z.string({ invalid_type_error: 'Must be of type string' }).max(150).optional(),
        phone_no: z
            .string({
                invalid_type_error: 'Parent/Caregiver contact number must be a string',
            })
            .regex(/^\d{11}$/, 'Mobile number must be exactly 11 digits')
            .min(11)
            .max(150)
            .optional(),
    })
    .transform((data) => {
        if (typeof data.dateofbirth !== 'string') {
            throw new Error('Invalid date of birth format');
        }

        const dob = new Date(data.dateofbirth);

        if (isNaN(dob.getTime())) {
            throw new Error('Invalid date string — could not parse to Date');
        }

        const ages = calculateAgeComponents(dob);

        if (data.suffixname === '') {
            data.suffixname = 'N/A';
        }

        return {
            ...data,
            ageinyears: ages.ageInYears,
            ageinmonths: ages.ageInMonths,
            ageindays: ages.ageInDays,
        };
    })
    .superRefine((values, ctx) => {
        if (values.member_of_IP === 'Y' && !values.IP_tribe) {
            ctx.addIssue({
                path: ['IP_tribe'],
                code: z.ZodIssueCode.custom,
                message: 'Must provide Indigenous Person Tribe',
            });
        }
        if ((values.member_of_IP === 'Y' && values.IP_tribe === 33) && !values.IP_tribe_specify) {
            ctx.addIssue({
                path: ['IP_tribe_specify'],
                code: z.ZodIssueCode.custom,
                message: 'Must specify Indigenous Person Tribe',
            });
        }
    });

export type PatientForm = z.infer<typeof patientFormSchema>;
