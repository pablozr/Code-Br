import { NextResponse, NextRequest } from 'next/server';
import { sendContactNotification, sendContactConfirmation } from '@/app/_lib/notifications/novu';
import { contactApiSchema } from '@/app/_lib/validation/api/contact-api-schema';
import rateLimit from '@/app/_lib/rate-limit';
import { sanitizeObject } from '@/app/_lib/validation/sanitize';

// Limitar a 5 requisições por minuto por IP
const limiter = rateLimit({
  interval: 60 * 1000, // 60 segundos
  uniqueTokenPerInterval: 500, // Máximo de 500 usuários por intervalo
});

export async function POST(request: Request) {
  // Aplicar rate limiting
  const rateLimitResult = await limiter.check(
    request as unknown as NextRequest, // Type casting necessário
    5, // Número máximo de requisições
    'contact_api' // Identificador único para esta rota
  );

  // Se o rate limit foi excedido, retornar erro 429
  if (rateLimitResult) {
    return rateLimitResult;
  }
  try {
    // Obter dados do corpo da requisição
    const data = await request.json();

    // Sanitizar dados antes da validação
    const sanitizedData = sanitizeObject(data);

    // Validar dados
    const validatedData = contactApiSchema.parse(sanitizedData);

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