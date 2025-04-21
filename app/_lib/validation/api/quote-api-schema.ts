import { z } from 'zod';
import { quoteFormSchema } from '../forms/quote-form-schema';

// Reutilizamos o schema do formulário para validação da API
export const quoteApiSchema = quoteFormSchema;

export type QuoteApiRequest = z.infer<typeof quoteApiSchema>;
