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
        //Patient Info
        // patient_number: z.string({
        //     required_error: 'Patient Number is required',
        //     invalid_type_error: 'Patient Number must be a string',
        // }),
        // firstname: z.string({
        //     required_error: 'First Name is required',
        //     invalid_type_error: 'First Name must be a string',
        // }),
        // middlename: z.string({
        //     required_error: 'Middle Name is required',
        //     invalid_type_error: 'Middle Name must be a string',
        // }),
        // lastname: z.string({
        //     required_error: 'Last Name is required',
        //     invalid_type_error: 'Last Name must be a string',
        // }),
        // suffixname: z.string({
        //     invalid_type_error: 'Suffix Name must be a string',
        // }),
        // sex: z.enum(['M', 'F'], {
        //     required_error: 'Sex is required',
        //     invalid_type_error: '',
        // }),
        // dateofbirth: z.date({
        //     required_error: 'Date of Birth is required',
        //     invalid_type_error: 'Date of Birth be a date',
        // }),
        // ageinyears: z.number({
        //     required_error: 'Date of Birth is required',
        //     invalid_type_error: 'Age in years must be a number',
        // }),
        // ageinmonths: z.number({
        //     required_error: 'Date of Birth is required',
        //     invalid_type_error: 'Age in months must be a number',
        // }),
        // ageindays: z.number({
        //     required_error: 'Date of Birth is required',
        //     invalid_type_error: 'Age in days must be a number',
        // }),
        // member_of_IP: z.enum(['Y', 'N'], {
        //     required_error: 'Mem'
        // })
        // IP_tribe
        // IP_tribe_specify
        // pat_address_reg
        // pat_address_prov
        // pat_address_city
        // pat_address_brgy
        // pat_address_street_name
        // pat_perm_address_reg
        // pat_perm_address_prov
        // pat_perm_address_city
        // pat_perm_address_brgy
        // pat_perm_address_street_name
        //         occupation: z.string({
        //             invalid_type_error: 'Occupation must be a string',
        //         }),
        diphtheria_dose: z.enum(['Y', 'N'], {
            required_error: 'Diphtheria Dose indication is required',
            invalid_type_error: 'Must either be Y or N',
        }),
        total_dose: z
            .union([z.literal('None'), z.literal(1), z.literal(2), z.literal(3), z.literal('Unknown')], {
                invalid_type_error: 'Must either be None, 1, 2, 3, or Unknown',
            })
            .optional(),
        date_last_vaccination: z
            .date({
                invalid_type_error: ' Date Last Vaccination must be a date',
            })
            .optional(),
        sourceinformation: z.union([z.literal(1), z.literal(2), z.literal(3)], {
            invalid_type_error: 'Source of Information must be only from among the following choices: Card, Recall, TCL',
        }).optional(),
        known_exposure: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)], {
                invalid_type_error:
                    'Known Exposure must only be from among the following choices: Confirmed Case, Probable Case, Carrier, or International Traveler',
            }).optional(),
        exposure_other: z
            .string({
                invalid_type_error: 'Other means of exposure must be a string',
            }).min(150)
            .optional(),
        name_school: z
            .string({
                invalid_type_error: 'School Name be must be a string',
            }).min(150)
            .optional(),
        travel14days: z
            .enum(['Y', 'N'], {
                invalid_type_error: 'Must be either Y or N',
            })
            .optional(),
            travel_detail: z.string({
                invalid_type_error: 'Travel Details must be of type string'
            }).min(150),
            date_onset: z.date({
                invalid_type_error: 'Date onset of symptoms must be a date type'
            }).optional(),
            fever: z.enum(['Y', 'N']).optional(),
            cough: z.enum(['Y', 'N']).optional(),
            sorethroat: z.enum(['Y', 'N']).optional(),
            pseudomembrane: z.enum(['Y', 'N']).optional(),
            swallowing: z.enum(['Y', 'N']).optional(),
            breathing: z.enum(['Y', 'N']).optional(),
            other_symptoms: z.enum(['Y', 'N']).optional(),
            other_symptoms_specify: z.string().min(150).optional(),
            outcome: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
            datedied: z.date({}).optional(),
            antibiotic: z.enum(['Y', 'N']).optional(),
            antibiotic_date: z.date({}).optional(),
            final_classi: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional()
    })
    .superRefine((values, ctx) => {
        if (values.total_dose && values.diphtheria_dose === 'Y') {
            ctx.addIssue({
                path: ['total_dose'],
                code: z.ZodIssueCode.custom,
                message: 'Total Dose is required',
            });
        }
        if (values.date_last_vaccination && values.diphtheria_dose === 'Y') {
            ctx.addIssue({
                path: ['date_last_vaccination'],
                code: z.ZodIssueCode.custom,
                message: 'Date Last Vaccination is required',
            });
        }
        if (values.sourceinformation && values.diphtheria_dose === 'Y') {
            ctx.addIssue({
                path: ['sourceinformation'],
                code: z.ZodIssueCode.custom,
                message: 'Source of Information is required',
            });
        }
        if(values.travel_detail && values.travel14days === 'Y'){
            ctx.addIssue({
                path:['travel_detail'],
                code: z.ZodIssueCode.custom,
                message: 'Traveil Details is required'
            })
        }
        if(values.other_symptoms_specify && values.other_symptoms === 'Y'){
            ctx.addIssue({
                path:['other_symptoms_specify'],
                code: z.ZodIssueCode.custom,
                message: 'Other symptoms Specify is required'
            })
        }
        if(values.datedied && values.outcome === 'D'){
            ctx.addIssue({
                path:['datedied'],
                code: z.ZodIssueCode.custom,
                message: 'Date Died of Illness is required'
            })
        }
        if(values.antibiotic_date && values.antibiotic === 'Y'){
            ctx.addIssue({
                path:['antibiotic_date'],
                code: z.ZodIssueCode.custom,
                message: 'Date of antibiotic therapy is required'
            })
        }
    });

export type UserForm = z.infer<typeof userFormSchema>;
