import { z } from 'zod';

export const labFormSchema = z
    .object({
        case_id: z.string({required_error: 'Case ID is missing', invalid_type_error: 'Must be of type string'}).max(50),
        date_specimen_collected: z
            .string()
            .refine((val) => val === '' || /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
                message: 'Invalid date format. Please use YYYY-MM-DD or leave it empty.',
            })
            .optional(),
        specimen_type: z
            .coerce
            .number()
            .refine((val) => [4, 5].includes(val), {
                message: 'Specimen Type must be either: Saliva or Nasopharyngeal/Oropharyngeal Swab (NPS/OPS)',
            })
            .optional(),
        lab_sent_RITM: z.enum(['Y', 'N'], { invalid_type_error: 'Must be either Yes or No' }).optional(),
        date_sent_RITM: z
            .string()
            .refine((val) => val === '' || /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
                message: 'Invalid date format. Please use YYYY-MM-DD or leave it empty.',
            })
            .optional(),
        date_received_by_lab: z
            .string()
            .refine((val) => val === '' || /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(val), {
                message: 'Invalid date format. Please use YYYY-MM-DD or leave it empty.',
            })
            .optional(),
        time_received_by_lab: z
            .string()
            .refine(
                (val) =>
                    /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(val),
                {
                    message: 'Time must be in the format hh:mm:ss (24-hour)',
                }).optional(),
        type_test: z
            .coerce
            .number()
            .refine((val) => [4, 5].includes(val), {
                message: 'Type of Test Conducted must be either: Polymerase Chain Reaction or Virus Isolation',
            })
            .optional(),
        lab_result: z
            .coerce
            .number()
            .refine((val) => [1, 2, 21, 22].includes(val), {
                message: 'Result of Laboratory Test must be either: POSITIVE, NEGATIVE, UNDETERMINED, OR NOT PROCESSED',
            })
            .optional(),
        typeoforganism: z.string({ invalid_type_error: 'Must be of type string' }).max(100).optional(),
        interpretation: z.string({ invalid_type_error: 'Must be of type string' }).optional(),
        epi_id: z.string({required_error:'EPI ID is missing. Network issue...'})
    });

export type LabForm = z.infer<typeof labFormSchema>;
