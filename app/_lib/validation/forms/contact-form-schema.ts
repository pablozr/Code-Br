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

export const contactFormSchema = z.object({
  // Campos para o formulário de contato
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

  mensagem: z.string()
    .min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' })
    .max(2000, { message: 'Mensagem muito longa' })
    .refine(val => val.trim().length > 0, { message: 'Mensagem é obrigatória' }),

  // Campos opcionais
  telefone: z.string()
    .optional()
    .refine(
      (phone) => {
        // Se não houver telefone, é válido (campo opcional)
        if (!phone || phone.trim() === '') return true;

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
      },
      { message: 'Formato de telefone inválido. Use o formato internacional: +DD (XX) XXXXX-XXXX' }
    ),

  assunto: z.string().optional(),

  // Campos para compatibilidade com o formulário em inglês
  name: z.string().optional(),
  message: z.string().optional(),
});

// Função auxiliar para normalizar os campos entre diferentes idiomas
export const normalizeContactFormData = (data: any): z.infer<typeof contactFormSchema> => {
  return {
    nome: data.nome || data.name || '',
    email: data.email || '',
    mensagem: data.mensagem || data.message || '',
    telefone: data.telefone || data.phone || '',
    assunto: data.assunto || data.subject || '',
  };
};

export type ContactFormValues = z.infer<typeof contactFormSchema>;
