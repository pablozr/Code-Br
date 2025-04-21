import { NextResponse } from 'next/server';
import { sendContactNotification, sendContactConfirmation } from '@/app/_lib/notifications/novu';
import { contactApiSchema } from '@/app/_lib/validation/api/contact-api-schema';

export async function POST(request: Request) {
  try {
    // Obter dados do corpo da requisição
    const data = await request.json();

    // Validar dados
    const validatedData = contactApiSchema.parse(data);

    // Enviar notificação para o administrador via Novu
    const adminNotification = await sendContactNotification(validatedData);

    // Enviar confirmação para o cliente via Novu
    const clientConfirmation = await sendContactConfirmation(validatedData);

    // Registrar se houve falha na notificação
    if (!adminNotification.success) {
      console.error('Falha ao enviar notificação para o administrador');
    }

    // Retornar resposta de sucesso
    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso',
      notifications: {
        admin: adminNotification.success,
        client: clientConfirmation.success
      }
    });
  } catch (error: any) {
    console.error('Erro ao processar mensagem de contato:', error);

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
