import { z } from 'zod';

export const contactFormSchema = z.object({
  nome: z.string()
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
    .refine(val => val.trim().length > 0, { message: 'Nome é obrigatório' }),

  email: z.string()
    .email({ message: 'Email inválido' })
    .refine(val => val.trim().length > 0, { message: 'Email é obrigatório' }),

  mensagem: z.string()
    .min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' })
    .refine(val => val.trim().length > 0, { message: 'Mensagem é obrigatória' }),

  telefone: z.string().optional(),
  
  assunto: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
