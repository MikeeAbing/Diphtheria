import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
// export const userSchema = z.object({
//     id: z.string(),
//     full_name: z.string(),
//     username: z.string(),
//     email: z.string(),
// });

// export type User = z.infer<typeof userSchema>;

const datetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
export const diphFormSchema = z
    .object({
        // case_id: z.string().max(50).optional(),
        patient_number: z.string({ required_error: 'Patient Number is missing' }).max(30),
        // disease_age: z.number().int().max(100),
        admitted: z.enum(['Y', 'N'], { required_error: 'Choose either Yes or No', invalid_type_error: 'Must either be Yes or No' }).optional(),
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
            .trim()
            .transform((val) => (val === '' ? undefined : val))
            .refine((val) => val === undefined || /^\d{11}$/.test(val), {
                message: 'Mobile number must be exactly 11 digits',
            })
            .optional(),
        date_report: z
            .string()
            .refine((val) => /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
                message: 'Invalid date format. Please use YYYY-MM-DD.',
            })
            .optional(),
        reporter: z.string({ invalid_type_error: 'Name of Reporter must be of type string' }).max(150).optional(),
        reporter_no: z
            .string({
                invalid_type_error: 'Reporter contact number must be a string',
            })
            .trim()
            .transform((val) => (val === '' ? undefined : val))
            .refine((val) => val === undefined || /^\d{11}$/.test(val), {
                message: 'Mobile number must be exactly 11 digits',
            })
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
            .trim()
            .transform((val) => (val === '' ? undefined : val))
            .refine((val) => val === undefined || /^\d{11}$/.test(val), {
                message: 'Mobile number must be exactly 11 digits',
            })
            .optional(),
        diphtheria_dose: z
            .enum(['Y', 'N'], {
                required_error: 'Diphtheria Dose indication is required',
                invalid_type_error: 'Must either be Yes or No',
            })
            .optional(),
        total_dose: z
            .union([z.literal('None'), z.literal(1), z.literal(2), z.literal(3), z.literal('Unknown')], {
                invalid_type_error: 'Must either be None, 1, 2, 3, or Unknown',
            })
            .optional(),
        date_last_vaccination: z
            .string()
            .refine((val) => val === '' || /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
                message: 'Invalid date format. Please use YYYY-MM-DD or leave it empty.',
            })
            .optional(),
        sourceinformation: z.coerce
            .number()
            .refine((val) => [1, 2, 3].includes(val), {
                message: 'Source of Information must be only from among the following choices: Card, Recall, TCL',
            })
            .optional(),
        // z
        //     .union([z.literal(1), z.literal(2), z.literal(3)], {
        //         invalid_type_error: 'Source of Information must be only from among the following choices: Card, Recall, TCL',
        //     })
        //     .optional(),
        known_exposure: z.coerce
            .number()
            .refine((val) => [1, 2, 3, 4].includes(val), {
                message:
                    'Known Exposure must only be from among the following choices: Confirmed Case, Probable Case, Carrier, or International Traveler',
            })
            .optional(),
        // z.preprocess(
        //     (val) => Number(val),
        //     z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]), {
        //     required_error: 'Known Exposure is required',
        //     invalid_type_error:
        //         'Known Exposure must only be from among the following choices: Confirmed Case, Probable Case, Carrier, or International Traveler',
        // }),
        // z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)], {
        //     required_error: 'Known Exposure is required',
        //     invalid_type_error:
        //         'Known Exposure must only be from among the following choices: Confirmed Case, Probable Case, Carrier, or International Traveler',
        // }),
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
            }),
        pidsr_status: z.string().max(10).optional(),
        fever: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        cough: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        sorethroat: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        pseudomembrane: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        swallowing: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        breathing: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        other_symptoms: z.enum(['Y', 'N'], { invalid_type_error: 'Must either be Yes or No' }).optional(),
        other_symptoms_specify: z.string().max(150).optional(),
        outcome: z.coerce
            .number()
            .refine((val) => [1, 2, 3].includes(val))
            .optional(),
        // z.preprocess(
        //     (val) => Number(val),
        //     z.union([z.literal(1), z.literal(2), z.literal(3)])).optional(),
        // z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
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
        final_classi: z.coerce
            .number()
            .refine((val) => [1, 2, 3, 4, 5].includes(val), {
                message: 'Must be one of 1, 2, 3, 4, or 5',
            })
            .optional(),
        // z.preprocess(
        //     (val) => Number(val),
        //     z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])).optional(),
        // z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional()
        // user_id: z.string().max(100).optional(),
        // timestamp: z
        //     .string()
        //     .regex(datetimeRegex, {
        //         message: "Invalid datetime format. Use 'yyyy-mm-dd hh:mm:ss'.",
        //     })
        //     .optional(),
        // verification_level: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
        // case_code: z.string().max(50).optional(),
        // last_modified_by: z
        //     .string()
        //     .regex(datetimeRegex, {
        //         message: "Invalid datetime format. Use 'yyyy-mm-dd hh:mm:ss'.",
        //     })
        //     .optional(),
        // last_modified_date_patient: z
        //     .string()
        //     .regex(datetimeRegex, {
        //         message: "Invalid datetime format. Use 'yyyy-mm-dd hh:mm:ss'.",
        //     })
        //     .optional(),
        // last_modified_date_disease: z
        //     .string()
        //     .regex(datetimeRegex, {
        //         message: "Invalid datetime format. Use 'yyyy-mm-dd hh:mm:ss'.",
        //     })
        //     .optional(),
        // last_modified_date_lab: z
        //     .string()
        //     .regex(datetimeRegex, {
        //         message: "Invalid datetime format. Use 'yyyy-mm-dd hh:mm:ss'.",
        //     })
        //     .optional(),
        // hfhudcode: z.string().max(255).optional(),
        // datevalidated_resu: z
        //     .string()
        //     .regex(datetimeRegex, {
        //         message: "Invalid datetime format. Use 'yyyy-mm-dd hh:mm:ss'.",
        //     })
        //     .optional(),
        // user_citycode: z
        //     .number()
        //     .int()
        //     .min(-2147483648, { message: 'Value must be >= -2,147,483,648' })
        //     .max(2147483647, { message: 'Value must be <= 2,147,483,647' }),
        // user_provcode: z
        //     .number()
        //     .int()
        //     .min(-2147483648, { message: 'Value must be >= -2,147,483,648' })
        //     .max(2147483647, { message: 'Value must be <= 2,147,483,647' }),
        // user_regcode: z
        //     .number()
        //     .int()
        //     .min(-2147483648, { message: 'Value must be >= -2,147,483,648' })
        //     .max(2147483647, { message: 'Value must be <= 2,147,483,647' }),
        // charteredcity: z.string().max(20),
        // dohretained: z.string().max(20),
        // hfhudcode_pesu: z.string().max(255).optional(),
        // hfhudcode_resu: z.string().max(255).optional(),
        // duplicate: z.union([z.literal('T'), z.literal('NULL')]).optional(),
        // timelapse_dateadmittodateencode: z.string().max(50).optional(),
        // timelapse_dateonsettodateencode: z.string().max(50).optional(),
        // timelapse_dateencodetodatevalidatedresu: z.string().max(50).optional(),
        // ageinmonths: z.number().min(1).max(12),
        // ageindays: z.number().min(1).max(31),
        // morbiditymonth: z.number().min(1).max(12),
    })
    .superRefine((values, ctx) => {
        if (!values.admitted && values.date_admitted) {
            ctx.addIssue({
                path: ['date_admitted'],
                code: z.ZodIssueCode.custom,
                message: 'Date Admitted is required',
            });
        }
        if (!values.total_dose && values.diphtheria_dose === 'Y') {
            ctx.addIssue({
                path: ['total_dose'],
                code: z.ZodIssueCode.custom,
                message: 'Total Dose is required',
            });
        }
        if (!values.date_last_vaccination && values.diphtheria_dose === 'Y') {
            ctx.addIssue({
                path: ['date_last_vaccination'],
                code: z.ZodIssueCode.custom,
                message: 'Date Last Vaccination is required',
            });
        }
        if (!values.sourceinformation && values.diphtheria_dose === 'Y') {
            ctx.addIssue({
                path: ['sourceinformation'],
                code: z.ZodIssueCode.custom,
                message: 'Source of Information is required',
            });
        }
        if (!values.travel_detail && values.travel14days === 'Y') {
            ctx.addIssue({
                path: ['travel_detail'],
                code: z.ZodIssueCode.custom,
                message: 'Traveil Details is required',
            });
        }
        if (!values.other_symptoms_specify && values.other_symptoms === 'Y') {
            ctx.addIssue({
                path: ['other_symptoms_specify'],
                code: z.ZodIssueCode.custom,
                message: 'Other symptoms Specify is required',
            });
        }
        if (!values.datedied && values.outcome === 2) {
            ctx.addIssue({
                path: ['datedied'],
                code: z.ZodIssueCode.custom,
                message: 'Date Died of Illness is required',
            });
        }
        if (!values.antibiotic_date && values.antibiotic === 'Y') {
            ctx.addIssue({
                path: ['antibiotic_date'],
                code: z.ZodIssueCode.custom,
                message: 'Date of antibiotic therapy is required',
            });
        }
        if (values.date_report === undefined && values.date_report === "") {
            ctx.addIssue({
                path: ['reporter'],
                code: z.ZodIssueCode.custom,
                message: 'Name of reporter must be provided',
            });
            ctx.addIssue({
                path: ['reporter_no'],
                code: z.ZodIssueCode.custom,
                message: 'Contact number of reporter must be provided',
            });
        }
        if (values.date_investigation === undefined && values.date_investigation === "") {
            ctx.addIssue({
                path: ['investigator'],
                code: z.ZodIssueCode.custom,
                message: 'Name of investigator must be provided',
            });
            ctx.addIssue({
                path: ['investigator_no'],
                code: z.ZodIssueCode.custom,
                message: 'Contact number of investigator must be provided',
            });
        }
    });

export type DIPHForm = z.infer<typeof diphFormSchema>;
