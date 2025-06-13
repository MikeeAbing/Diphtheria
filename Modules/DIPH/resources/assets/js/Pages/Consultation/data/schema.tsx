import { z } from 'zod';

// Regex for strict YYYY-MM-DD format
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const consultationFormSchema = z.object({
    patient_number: z.string(),
    consultation_id: z.string().optional(),
    consultation_date: z.string().regex(dateRegex, {
        message: 'Date must be in YYYY-MM-DD format',
    }),
    consultation_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (24-hour HH:MM)'),
    mode_of_transaction: z.enum(['Admitted', 'Referral', 'Visited', 'Walk-in'], {message: 'Mode of transaction is required'}),
    type_of_consultation: z.enum(['Adult Immunization', 'Animal Bite', 'Diphtheria', 'General']),
    chief_complaint: z.string().optional(),
});

export type ConsultationForm = z.infer<typeof consultationFormSchema>;
