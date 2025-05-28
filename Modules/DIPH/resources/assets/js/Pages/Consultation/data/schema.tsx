import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const consultationFormSchema = z.object({
  patient_number: z.string(),
  consultation_id: z.string().optional(),
  consultation_date: z.string(),
  consultation_time: z.string(),
  mode_of_transaction: z.string(),
  type_of_consultation: z.string(),
  chief_complaint: z.string().optional(),
})

export type ConsultationForm = z.infer<typeof consultationFormSchema>