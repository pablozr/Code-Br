'use server';

import { db } from '@/lib/db/drizzle';
import { contactRequests } from '@/lib/db/schema';
import { z } from 'zod';
import { contactFormSchema, ContactFormValues, normalizeContactFormData } from '@/app/_lib/validation/forms/contact-form-schema';

// Função para salvar um novo pedido de contato
export async function saveContactRequest(data: any) {
  try {
    // Normalizar os dados para garantir compatibilidade
    const normalizedData = normalizeContactFormData(data);

    // Validar os dados normalizados
    const validatedData = contactFormSchema.parse(normalizedData);

    const [result] = await db
      .insert(contactRequests)
      .values({
        name: validatedData.nome || validatedData.name || '',
        email: validatedData.email,
        message: validatedData.mensagem || validatedData.message || '',
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
