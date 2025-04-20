import { NextResponse } from 'next/server';
import { sendQuoteRequestNotification, sendClientConfirmation } from '@/lib/notifications/novu';
import { z } from 'zod';

// Schema de validação para o formulário de orçamento
const formSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  telefone: z.string().min(8, { message: 'Telefone inválido' }),
  empresa: z.string().optional(),
  tipoSite: z.string().min(1, { message: 'Selecione o tipo de site' }),
  descricao: z.string().min(10, { message: 'Descrição deve ter pelo menos 10 caracteres' }),
  prazo: z.string().optional(),
  orcamento: z.string().optional(),
  newsletter: z.boolean().default(true),
  whatsapp: z.boolean().default(false),
});

export async function POST(request: Request) {
  try {
    // Obter dados do corpo da requisição
    const data = await request.json();

    // Validar dados
    const validatedData = formSchema.parse(data);



    // Enviar notificação para o administrador via Novu
    const adminNotification = await sendQuoteRequestNotification(validatedData);

    // Enviar confirmação para o cliente via Novu
    const clientConfirmation = await sendClientConfirmation(validatedData);

    // Registrar se houve falha na notificação
    if (!adminNotification.success) {
      console.error('Falha ao enviar notificação para o administrador');
    }

    // Retornar resposta de sucesso
    return NextResponse.json({
      success: true,
      message: 'Orçamento enviado com sucesso',
      notifications: {
        admin: adminNotification.success,
        client: clientConfirmation.success
      }
    });
  } catch (error) {
    console.error('Erro ao processar solicitação de orçamento:', error);

    // Retornar resposta de erro
    return NextResponse.json(
      {
        success: false,
        error: error instanceof z.ZodError
          ? error.errors.map(e => e.message).join(', ')
          : 'Erro ao processar solicitação'
      },
      { status: 400 }
    );
  }
}
