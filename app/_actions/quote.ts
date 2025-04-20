'use server';

import { createQuoteRequest, updateQuoteNotificationStatus } from '@/lib/db/queries';
import { sendQuoteRequestNotification, sendClientConfirmation } from '@/lib/notifications/novu';
import { z } from 'zod';

// Schema de validação para o formulário de orçamento
export const quoteFormSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().optional(),
  websiteType: z.string().optional(),
  features: z.array(z.string()).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres' }),
});

// Tipo inferido do schema
export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

// Função para salvar um novo pedido de orçamento e enviar notificações
export async function submitQuoteRequest(data: QuoteFormValues) {
  try {
    // Validar os dados do formulário
    const validatedData = quoteFormSchema.parse(data);
    
    // Salvar no banco de dados
    const result = await createQuoteRequest({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      websiteType: validatedData.websiteType,
      features: validatedData.features,
      budget: validatedData.budget,
      timeline: validatedData.timeline,
      message: validatedData.message,
    });
    
    // Enviar notificação para o administrador
    const adminNotification = await sendQuoteRequestNotification({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      message: validatedData.message,
      websiteType: validatedData.websiteType,
      features: validatedData.features,
      budget: validatedData.budget,
      timeline: validatedData.timeline,
    });
    
    // Enviar confirmação para o cliente
    const clientConfirmation = await sendClientConfirmation({
      name: validatedData.name,
      email: validatedData.email,
    });
    
    // Atualizar o status da notificação no banco de dados
    if (adminNotification.success && clientConfirmation.success) {
      await updateQuoteNotificationStatus(result.id, 'sent');
    } else {
      await updateQuoteNotificationStatus(result.id, 'failed');
    }
    
    return { 
      success: true, 
      data: result,
      notifications: {
        admin: adminNotification.success,
        client: clientConfirmation.success
      }
    };
  } catch (error) {
    console.error('Erro ao processar solicitação de orçamento:', error);
    return { 
      success: false, 
      error: error instanceof z.ZodError 
        ? error.errors.map(e => e.message).join(', ') 
        : 'Erro ao processar solicitação' 
    };
  }
}

// Função para obter todos os pedidos de orçamento
export async function getQuoteRequests() {
  try {
    const requests = await getQuoteRequests();
    return { success: true, data: requests };
  } catch (error) {
    console.error('Erro ao buscar solicitações de orçamento:', error);
    return { success: false, error: 'Erro ao buscar solicitações' };
  }
}
