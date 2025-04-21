import { z } from 'zod';
import { contactFormSchema } from '../forms/contact-form-schema';

// Reutilizamos o schema do formulário para validação da API
export const contactApiSchema = contactFormSchema;

export type ContactApiRequest = z.infer<typeof contactApiSchema>;
