'use server';

import { createQuoteRequest, updateQuoteNotificationStatus } from '@/lib/db/queries';
import { sendQuoteRequestNotification, sendClientConfirmation } from '@/app/_lib/notifications/novu';
import { z } from 'zod';
import { sanitizeObject } from '@/app/_lib/validation/sanitize';

// Importar o schema de validação do formulário de orçamento
import { quoteFormSchema } from '@/app/_lib/validation/forms/quote-form-schema';

// Tipo inferido do schema
export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

// Função para salvar um novo pedido de orçamento e enviar notificações
export async function submitQuoteRequest(data: QuoteFormValues) {
  try {
    // Sanitizar os dados antes da validação
    const sanitizedData = sanitizeObject(data);

    // Validar os dados do formulário
    const validatedData = quoteFormSchema.parse(sanitizedData);

    // Salvar no banco de dados
    const result = await createQuoteRequest({
      name: validatedData.nome,
      email: validatedData.email,
      phone: validatedData.telefone || '',
      websiteType: validatedData.tipoSite || '',
      features: validatedData.features || [],
      budget: validatedData.orcamento || '',
      timeline: validatedData.prazo || '',
      message: validatedData.descricao,
    });

    // Enviar notificação para o administrador
    const adminNotification = await sendQuoteRequestNotification({
      nome: validatedData.nome,
      email: validatedData.email,
      telefone: validatedData.telefone || '',
      descricao: validatedData.descricao,
      tipoSite: validatedData.tipoSite || '',
      features: validatedData.features || [],
      orcamento: validatedData.orcamento || '',
      prazo: validatedData.prazo || '',
      empresa: validatedData.empresa || '',
      newsletter: validatedData.newsletter,
      whatsapp: validatedData.whatsapp,
      selectedFeatures: validatedData.selectedFeatures || [],
      estimatedPrice: validatedData.estimatedPrice,
      complexity: validatedData.complexity || '',
    });

    // Enviar confirmação para o cliente
    const clientConfirmation = await sendClientConfirmation({
      nome: validatedData.nome,
      email: validatedData.email,
      telefone: validatedData.telefone || '',
      tipoSite: validatedData.tipoSite || '',
      descricao: validatedData.descricao,
      newsletter: validatedData.newsletter,
      whatsapp: validatedData.whatsapp,
      features: validatedData.features || [],
      selectedFeatures: validatedData.selectedFeatures || [],
      empresa: validatedData.empresa || '',
      orcamento: validatedData.orcamento || '',
      prazo: validatedData.prazo || '',
      estimatedPrice: validatedData.estimatedPrice,
      complexity: validatedData.complexity || '',
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
    // Importar a função de consulta do banco de dados
    const { getQuoteRequests: fetchQuoteRequests } = await import('@/lib/db/queries');
    const requests = await fetchQuoteRequests();
    return { success: true, data: requests };
  } catch (error) {
    console.error('Erro ao buscar solicitações de orçamento:', error);
    return { success: false, error: 'Erro ao buscar solicitações' };
  }
}
