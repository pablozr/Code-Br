'use server';

import { db } from '@/lib/db/drizzle';
import { contactRequests } from '@/lib/db/schema';
import { z } from 'zod';

// Schema de validação para o formulário de contato
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  message: z.string().min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' }),
});

// Tipo inferido do schema
export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Função para salvar um novo pedido de contato
export async function saveContactRequest(data: ContactFormValues) {
  try {
    const validatedData = contactFormSchema.parse(data);
    
    const [result] = await db
      .insert(contactRequests)
      .values({
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
      })
      .returning();
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Erro ao salvar solicitação de contato:', error);
    return { 
      success: false, 
      error: error instanceof z.ZodError 
        ? error.errors.map(e => e.message).join(', ') 
        : 'Erro ao processar solicitação' 
    };
  }
}

// Função para obter todos os pedidos de contato
export async function getContactRequests() {
  try {
    const requests = await db
      .select()
      .from(contactRequests)
      .orderBy(contactRequests.createdAt);
    
    return { success: true, data: requests };
  } catch (error) {
    console.error('Erro ao buscar solicitações de contato:', error);
    return { success: false, error: 'Erro ao buscar solicitações' };
  }
}
