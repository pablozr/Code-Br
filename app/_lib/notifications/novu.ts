import { Novu } from '@novu/node';
import { QuoteFormValues } from '../validation/forms/quote-form-schema';
import { ContactFormValues } from '../validation/forms/contact-form-schema';

// Inicializar o cliente Novu com a API key
let novuClient: Novu | null = null;

export function getNovuClient() {
  if (!novuClient) {
    const apiKey = process.env.NOVU_API_KEY;

    if (!apiKey) {
      throw new Error('NOVU_API_KEY não está definida nas variáveis de ambiente');
    }

    novuClient = new Novu(apiKey);
  }

  return novuClient;
}

// Função para enviar notificação de novo pedido de orçamento
export async function sendQuoteRequestNotification(data: QuoteFormValues) {
  try {
    const novu = getNovuClient();

    // Criar ou atualizar o assinante (você como administrador)
    await novu.subscribers.identify(process.env.ADMIN_EMAIL_ID || 'admin', {
      email: process.env.ADMIN_EMAIL || 'admin@codebr.com',
      phone: process.env.ADMIN_PHONE,
    });

    // Mapear os dados para formatos mais legíveis
    const websiteType = (() => {
      switch (data.tipoSite) {
        case 'landing': return 'Landing Page';
        case 'corporate': return 'Site Corporativo';
        case 'ecommerce': return 'E-commerce';
        case 'custom': return 'Projeto Personalizado';
        default: return data.tipoSite;
      }
    })();

    const budget = (() => {
      if (data.estimatedPrice) {
        return `Estimativa: ${data.orcamento}`;
      }

      switch (data.orcamento) {
        case 'ate2k': return 'Até R$ 2.000';
        case '2k-5k': return 'R$ 2.000 - R$ 5.000';
        case '5k-10k': return 'R$ 5.000 - R$ 10.000';
        case '10k-20k': return 'R$ 10.000 - R$ 20.000';
        case 'acima20k': return 'Acima de R$ 20.000';
        case 'flexivel': return 'Flexível / A definir';
        default: return data.orcamento || 'Não especificado';
      }
    })();

    const timeline = (() => {
      switch (data.prazo) {
        case 'urgent': return 'Urgente (1-2 semanas)';
        case 'normal': return 'Normal (3-4 semanas)';
        case 'relaxed': return 'Relaxado (1-2 meses)';
        case 'flexible': return 'Flexível';
        default: return data.prazo || 'Não especificado';
      }
    })();

    // Formatar as funcionalidades selecionadas
    const featuresFormatted = data.selectedFeatures && data.selectedFeatures.length > 0
      ? data.selectedFeatures.join(', ')
      : 'Nenhuma funcionalidade específica selecionada';

    const complexity = (() => {
      switch (data.complexity) {
        case 'low': return 'Baixa';
        case 'medium': return 'Média';
        case 'high': return 'Alta';
        case 'enterprise': return 'Empresarial';
        default: return data.complexity || 'Média';
      }
    })();

    // Enviar a notificação
    const result = await novu.trigger('new-quote-request', {
      to: {
        subscriberId: process.env.ADMIN_EMAIL_ID || 'admin',
      },
      payload: {
        name: data.nome,
        email: data.email,
        phone: data.telefone,
        company: data.empresa || 'Não informado',
        message: data.descricao,
        websiteType,
        budget,
        timeline,
        newsletter: data.newsletter ? 'Sim' : 'Não',
        whatsapp: data.whatsapp ? 'Sim' : 'Não',
        requestDate: new Date().toLocaleString('pt-BR'),
        features: featuresFormatted,
        complexity: complexity,
        estimatedPrice: data.estimatedPrice ? `${data.estimatedPrice}` : 'Não calculado',
      },
    });

    return { success: true, result };
  } catch (error: any) {
    console.error('Erro ao enviar notificação:', error);
    return { success: false, error: error?.message || 'Erro desconhecido' };
  }
}

// Função para enviar confirmação ao cliente
export async function sendClientConfirmation(data: QuoteFormValues) {
  try {
    const novu = getNovuClient();

    // Criar ou atualizar o assinante (cliente)
    await novu.subscribers.identify(data.email, {
      email: data.email,
      firstName: data.nome.split(' ')[0],
      lastName: data.nome.split(' ').slice(1).join(' '),
    });

    // Mapear os dados para formatos mais legíveis
    const websiteType = (() => {
      switch (data.tipoSite) {
        case 'landing': return 'Landing Page';
        case 'corporate': return 'Site Corporativo';
        case 'ecommerce': return 'E-commerce';
        case 'custom': return 'Projeto Personalizado';
        default: return data.tipoSite;
      }
    })();

    // Formatar as funcionalidades selecionadas
    const featuresFormatted = data.selectedFeatures && data.selectedFeatures.length > 0
      ? data.selectedFeatures.join(', ')
      : 'Nenhuma funcionalidade específica selecionada';

    // Enviar a notificação de confirmação
    const result = await novu.trigger('quote-request-confirmation', {
      to: {
        subscriberId: data.email,
      },
      payload: {
        name: data.nome,
        requestDate: new Date().toLocaleString('pt-BR'),
        websiteType,
        features: featuresFormatted,
        estimatedPrice: data.estimatedPrice ? `${data.orcamento}` : 'Não calculado',
      },
    });

    return { success: true, result };
  } catch (error: any) {
    console.error('Erro ao enviar confirmação ao cliente:', error);
    return { success: false, error: error?.message || 'Erro desconhecido' };
  }
}

// Função para enviar notificação de contato
export async function sendContactNotification(data: ContactFormValues) {
  try {
    const novu = getNovuClient();

    // Criar ou atualizar o assinante (você como administrador)
    await novu.subscribers.identify(process.env.ADMIN_EMAIL_ID || 'admin', {
      email: process.env.ADMIN_EMAIL || 'admin@codebr.com',
      phone: process.env.ADMIN_PHONE,
    });

    // Enviar a notificação
    const result = await novu.trigger('new-contact-message', {
      to: {
        subscriberId: process.env.ADMIN_EMAIL_ID || 'admin',
      },
      payload: {
        name: data.nome,
        email: data.email,
        phone: data.telefone || 'Não informado',
        subject: data.assunto || 'Não informado',
        message: data.mensagem,
        requestDate: new Date().toLocaleString('pt-BR'),
      },
    });

    return { success: true, result };
  } catch (error: any) {
    console.error('Erro ao enviar notificação de contato:', error);
    return { success: false, error: error?.message || 'Erro desconhecido' };
  }
}

// Função para enviar confirmação ao cliente de contato
export async function sendContactConfirmation(data: ContactFormValues) {
  try {
    const novu = getNovuClient();

    // Criar ou atualizar o assinante (cliente)
    await novu.subscribers.identify(data.email, {
      email: data.email,
      firstName: data.nome.split(' ')[0],
      lastName: data.nome.split(' ').slice(1).join(' '),
    });

    // Enviar a notificação de confirmação
    const result = await novu.trigger('contact-confirmation', {
      to: {
        subscriberId: data.email,
      },
      payload: {
        name: data.nome,
        requestDate: new Date().toLocaleString('pt-BR'),
      },
    });

    return { success: true, result };
  } catch (error: any) {
    console.error('Erro ao enviar confirmação ao cliente de contato:', error);
    return { success: false, error: error?.message || 'Erro desconhecido' };
  }
}
