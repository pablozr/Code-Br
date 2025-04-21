import { z } from 'zod';

export const quoteFormSchema = z.object({
  nome: z.string()
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
    .refine(val => val.trim().length > 0, { message: 'Nome é obrigatório' }),

  email: z.string()
    .email({ message: 'Email inválido' })
    .refine(val => val.trim().length > 0, { message: 'Email é obrigatório' }),

  telefone: z.string()
    .min(8, { message: 'Telefone inválido' })
    .max(20, { message: 'Telefone muito longo' })
    .refine(val => val.trim().length > 0, { message: 'Telefone é obrigatório' })
    .refine(val => /^\+?[0-9\s\(\)\-]+$/.test(val), {
      message: 'Formato inválido. Use apenas números, espaços, parênteses e hífens'
    }),

  empresa: z.string().optional(),

  tipoSite: z.string()
    .min(1, { message: 'Selecione o tipo de site' })
    .refine(val => ['landing', 'institucional', 'ecommerce', 'blog', 'personalizado'].includes(val), {
      message: 'Tipo de site inválido'
    }),

  descricao: z.string()
    .min(10, { message: 'Descrição deve ter pelo menos 10 caracteres' })
    .refine(val => val.trim().length > 0, { message: 'Descrição é obrigatória' }),

  prazo: z.string().optional(),

  orcamento: z.string().optional(),

  newsletter: z.boolean().default(true),

  whatsapp: z.boolean().default(false),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
