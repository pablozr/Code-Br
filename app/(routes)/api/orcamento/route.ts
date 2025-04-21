import { NextResponse } from 'next/server';
import { sendQuoteRequestNotification, sendClientConfirmation } from '@/app/_lib/notifications/novu';
import { quoteApiSchema } from '@/app/_lib/validation/api/quote-api-schema';

export async function POST(request: Request) {
  try {
    // Obter dados do corpo da requisição
    const data = await request.json();

    // Validar dados
    const validatedData = quoteApiSchema.parse(data);

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
  } catch (error: any) {
    console.error('Erro ao processar solicitação de orçamento:', error);

    // Retornar resposta de erro
    return NextResponse.json(
      {
        success: false,
        error: error.errors ? error.errors.map((e: any) => e.message).join(', ') : 'Erro ao processar solicitação'
      },
      { status: 400 }
    );
  }
}
