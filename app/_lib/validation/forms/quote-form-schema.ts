import { z } from 'zod';

// Lista de domínios de email populares
const popularEmailDomains = [
  'gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com',
  'protonmail.com', 'aol.com', 'mail.com', 'zoho.com', 'yandex.com',
  'live.com', 'msn.com', 'me.com', 'mac.com', 'gmx.com', 'web.de',
  'uol.com.br', 'bol.com.br', 'terra.com.br', 'ig.com.br', 'globo.com',
  'r7.com', 'zipmail.com.br', 'yahoo.com.br', 'hotmail.com.br', 'outlook.com.br'
];

// Lista de TLDs (Top Level Domains) comuns
const commonTLDs = [
  '.com', '.com.br', '.org', '.net', '.io', '.co', '.info', '.biz', '.edu',
  '.gov', '.mil', '.int', '.eu', '.ch', '.de', '.fr', '.uk', '.us', '.ca',
  '.jp', '.cn', '.ru', '.in', '.au', '.nz'
];

// Regex para validação de telefone internacional
// Aceita formatos como: +55 11 98765-4321, +1 (555) 123-4567, etc.
// Mais permissiva para aceitar diferentes formatos, mas ainda exige o código do país
const phoneRegex = /^\+?[0-9]{1,4}[-. ]?(\([0-9]{1,5}\)[-. ]?)?[0-9]{1,10}[-. ]?[0-9]{1,10}[-. ]?[0-9]{0,10}$/;

// Função para limpar o telefone antes da validação
const cleanPhoneNumber = (phone: string): string => {
  // Remover espaços, parênteses, traços e outros caracteres não numéricos, exceto o +
  return phone.replace(/[^\d+]/g, '');
};

export const quoteFormSchema = z.object({
  nome: z.string()
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
    .max(100, { message: 'Nome muito longo' })
    .refine(val => val.trim().length > 0, { message: 'Nome é obrigatório' }),

  email: z.string()
    .email({ message: 'Email inválido' })
    .refine(val => val.trim().length > 0, { message: 'Email é obrigatório' })
    .refine(
      (email) => {
        // Se o email não tiver um @, é inválido (já verificado pelo .email())
        if (!email.includes('@')) return false;

        const domain = email.split('@')[1]?.toLowerCase();

        // Se não houver domínio, é inválido
        if (!domain) return false;

        // Verificar se o domínio está na lista de domínios populares
        if (popularEmailDomains.includes(domain)) return true;

        // Verificar se o domínio termina com um TLD comum (para emails corporativos)
        return commonTLDs.some(tld => domain.endsWith(tld));
      },
      { message: 'Por favor, use um email válido (Gmail, Outlook, email corporativo, etc.)' }
    ),

  telefone: z.string()
    .min(1, { message: 'Telefone é obrigatório' })
    .max(25, { message: 'Telefone muito longo' })
    .refine(val => val.trim().length > 0, { message: 'Telefone é obrigatório' })
    .refine(
      (phone) => {
        try {
          // Limpar o telefone antes da validação
          const cleanedPhone = cleanPhoneNumber(phone);

          // Verificar se o telefone começa com + (código do país)
          if (!cleanedPhone.startsWith('+')) {
            return false;
          }

          // Verificar se o telefone tem pelo menos 8 dígitos após o código do país
          if (cleanedPhone.length < 9) { // +X seguido de pelo menos 8 dígitos
            return false;
          }

          // Usar a regex para validar o formato
          return phoneRegex.test(phone);
        } catch (e) {
          // Em caso de erro, retornar falso
          return false;
        }
      },
      { message: 'Formato inválido. Use: +DD (XX) XXXXX-XXXX' }
    ),

  empresa: z.string().optional(),

  tipoSite: z.string()
    .min(1, { message: 'Selecione o tipo de site' }),

  descricao: z.string()
    .min(10, { message: 'Descrição deve ter pelo menos 10 caracteres' })
    .max(2000, { message: 'Descrição muito longa' })
    .refine(val => val.trim().length > 0, { message: 'Descrição é obrigatória' }),

  prazo: z.string().optional(),
  orcamento: z.string().optional(),
  newsletter: z.boolean().default(true),
  whatsapp: z.boolean().default(false),
  features: z.array(z.string()).default([]),
  estimatedPrice: z.number().optional(),
  complexity: z.string().optional(),
  selectedFeatures: z.array(z.string()).default([]),
  featureDetails: z.record(z.string(), z.any()).optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

