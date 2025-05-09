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

export const userFormSchema = z
    .object({
        admitted: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }),
        date_admitted: z
            .string()
            .refine((val) => val === '' || /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
                message: 'Invalid date format. Please use YYYY-MM-DD or leave it empty.',
            })
            .optional(),
        caregiver: z.string({ invalid_type_error: 'Name of Parent/Caregiver must be of type string' }).max(150).optional(),
        caregiver_no: z
            .string({
                invalid_type_error: 'Parent/Caregiver contact number must be a string',
            })
            .regex(/^\d{11}$/, 'Mobile number must be exactly 11 digits')
            .min(11)
            .max(150)
            .optional(),
        date_report: z
            .string()
            // .refine((val) => /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
            //     message: 'Invalid date format. Please use YYYY-MM-DD.',
            // })
            .optional(),
        reporter: z.string({ invalid_type_error: 'Name of Reporter must be of type string' }).max(150).optional(),
        reporter_no: z
            .string({
                invalid_type_error: 'Reporter contact number must be a string',
            })
            .regex(/^\d{11}$/, 'Mobile number must be exactly 11 digits')
            .min(11)
            .max(11)
            .optional(),
        date_investigation: z
            .string()
            .refine((val) => val === '' || /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
                message: 'Invalid date format. Please use YYYY-MM-DD or leave it empty.',
            })
            .optional(),
        investigator: z.string({ invalid_type_error: 'Name of Investigator must be of type string' }).max(150).optional(),
        investigator_no: z
            .string({
                invalid_type_error: 'Reporter contact number must be a string',
            })
            .regex(/^\d{11}$/, 'Mobile number must be exactly 11 digits')
            .min(11)
            .max(11)
            .optional(),
        diphtheria_dose: z
            .enum(['Y', 'N'], {
                required_error: 'Diphtheria Dose indication is required',
                invalid_type_error: 'Must either be Yes or No',
            })
            .optional(),
        total_dose: z
            .union([z.literal('None'), z.literal(1), z.literal(2), z.literal(3), z.literal('Unknown'), z.literal('')], {
                invalid_type_error: 'Must either be None, 1, 2, 3, or Unknown',
            })
            .optional(),
        date_last_vaccination: z
            .string()
            .refine((val) => val === '' || /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
                message: 'Invalid date format. Please use YYYY-MM-DD or leave it empty.',
            })
            .optional(),
        sourceinformation: z
            .union([z.literal(1), z.literal(2), z.literal(3), z.literal('')], {
                invalid_type_error: 'Source of Information must be only from among the following choices: Card, Recall, TCL',
            })
            .optional(),
        known_exposure: z
            .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal('')], {
                required_error: 'Known Exposure is required',
                invalid_type_error:
                    'Known Exposure must only be from among the following choices: Confirmed Case, Probable Case, Carrier, or International Traveler',
            })
            .optional(),
        exposure_other: z
            .string({
                invalid_type_error: 'Other means of exposure must be a string',
            })
            .max(150)
            .optional(),
        name_school: z
            .string({
                invalid_type_error: 'School Name be must be a string',
            })
            .max(150)
            .optional(),
        travel14days: z
            .enum(['Y', 'N'], {
                invalid_type_error: 'Must be either Yes or No',
            })
            .optional(),
        travel_detail: z
            .string({
                invalid_type_error: 'Travel Details must be of type string',
            })
            .max(150),
        date_onset: z
            .string()
            .refine((val) => val === '' || /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
                message: 'Invalid date format. Please use YYYY-MM-DD or leave it empty.',
            })
            .optional(),
        fever: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        cough: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        sorethroat: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        pseudomembrane: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        swallowing: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        breathing: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        other_symptoms: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        other_symptoms_specify: z.string().max(150).optional(),
        outcome: z.union([z.literal(1), z.literal(2), z.literal(3)], z.literal('')).optional(),
        datedied: z
            .string()
            .refine((val) => val === '' || /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
                message: 'Invalid date format. Please use YYYY-MM-DD or leave it empty.',
            })
            .optional(),
        antibiotic: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        antibiotic_date: z
            .string()
            .refine((val) => val === '' || /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
                message: 'Invalid date format. Please use YYYY-MM-DD or leave it empty.',
            })
            .optional(),
        diphtheriatoxin: z.enum(['Y', 'N'], { invalid_type_error: 'Must be either Yes or No' }).optional(),
        diphtheriatoxin_date: z
            .string()
            .refine((val) => val === '' || /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
                message: 'Invalid date format. Please use YYYY-MM-DD or leave it empty.',
            })
            .optional(),
        // date_specimen_collected: z
        //     .string()
        //     .refine((val) => /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
        //         message: 'Invalid date format. Please use YYYY-MM-DD.',
        //     })
        //     .optional(),
        final_classi: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)], z.literal('')).optional(),
    })
    .superRefine((values, ctx) => {
        // if (!values.total_dose && values.diphtheria_dose === 'Y') {
        //     ctx.addIssue({
        //         path: ['total_dose'],
        //         code: z.ZodIssueCode.custom,
        //         message: 'Total Dose is required',
        //     });
        // }
        // if (!values.date_last_vaccination && values.diphtheria_dose === 'Y') {
        //     ctx.addIssue({
        //         path: ['date_last_vaccination'],
        //         code: z.ZodIssueCode.custom,
        //         message: 'Date Last Vaccination is required',
        //     });
        // }
        // if (!values.sourceinformation && values.diphtheria_dose === 'Y') {
        //     ctx.addIssue({
        //         path: ['sourceinformation'],
        //         code: z.ZodIssueCode.custom,
        //         message: 'Source of Information is required',
        //     });
        // }
        // if (!values.travel_detail && values.travel14days === 'Y') {
        //     ctx.addIssue({
        //         path: ['travel_detail'],
        //         code: z.ZodIssueCode.custom,
        //         message: 'Traveil Details is required',
        //     });
        // }
        // if (!values.other_symptoms_specify && values.other_symptoms === 'Y') {
        //     ctx.addIssue({
        //         path: ['other_symptoms_specify'],
        //         code: z.ZodIssueCode.custom,
        //         message: 'Other symptoms Specify is required',
        //     });
        // }
        // if (!values.datedied && values.outcome === 2) {
        //     ctx.addIssue({
        //         path: ['datedied'],
        //         code: z.ZodIssueCode.custom,
        //         message: 'Date Died of Illness is required',
        //     });
        // }
        // if (!values.antibiotic_date && values.antibiotic === 'Y') {
        //     ctx.addIssue({
        //         path: ['antibiotic_date'],
        //         code: z.ZodIssueCode.custom,
        //         message: 'Date of antibiotic therapy is required',
        //     });
        // }
    });

export type UserForm = z.infer<typeof userFormSchema>;
