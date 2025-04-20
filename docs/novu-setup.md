# Configuração do Novu para Notificações

Este guia explica como configurar o Novu para enviar notificações por email e WhatsApp quando alguém preencher o formulário de orçamento.

## O que é o Novu?

[Novu](https://novu.co/) é uma plataforma de notificações de código aberto que permite enviar notificações por diversos canais (email, SMS, push, chat) a partir de uma única API.

## Passo a Passo para Configuração

### 1. Criar uma conta no Novu

1. Acesse [novu.co](https://novu.co/) e crie uma conta gratuita
2. Após o login, você será direcionado para o dashboard

### 2. Obter a API Key

1. No dashboard do Novu, vá para "Settings" > "API Keys"
2. Copie a chave de API mostrada
3. Adicione esta chave ao seu arquivo `.env` como `NOVU_API_KEY`

### 3. Configurar os Provedores de Notificação

#### Para Email:

1. No dashboard do Novu, vá para "Settings" > "Integrations" > "Email"
2. Você pode escolher entre vários provedores de email (Mailgun, Postmark, Amazon SES, etc.)
3. Escolha um provedor de sua preferência:
   - Crie uma conta no provedor escolhido
   - Obtenha as credenciais necessárias
   - Configure um remetente verificado
   - Adicione estas informações no Novu

#### Para WhatsApp:

1. No dashboard do Novu, vá para "Settings" > "Integrations" > "Chat"
2. Selecione "WhatsApp" e escolha um provedor (recomendamos Twilio)
3. Para configurar o Twilio:
   - Crie uma conta no [Twilio](https://www.twilio.com/)
   - Configure o WhatsApp Business API
   - Obtenha o SID da conta e o token de autenticação
   - Adicione estas informações no Novu

### 4. Criar Templates de Notificação

#### Template para Administrador:

1. No dashboard do Novu, vá para "Notification Center" > "Notification Templates"
2. Clique em "Create Notification Template"
3. Dê o nome "new-quote-request" (importante usar exatamente este nome)
4. Configure os canais:

   **Para Email:**
   - Assunto: "Nova Solicitação de Orçamento - {{name}}"
   - Conteúdo:
   ```html
   <h2>Nova Solicitação de Orçamento</h2>
   <p><strong>Nome:</strong> {{name}}</p>
   <p><strong>Email:</strong> {{email}}</p>
   <p><strong>Telefone:</strong> {{phone}}</p>
   <p><strong>Empresa:</strong> {{company}}</p>
   <p><strong>Tipo de Site:</strong> {{websiteType}}</p>
   <p><strong>Descrição:</strong> {{message}}</p>
   <p><strong>Orçamento:</strong> {{budget}}</p>
   <p><strong>Prazo:</strong> {{timeline}}</p>
   <p><strong>Newsletter:</strong> {{newsletter}}</p>
   <p><strong>WhatsApp:</strong> {{whatsapp}}</p>
   <p><strong>Data:</strong> {{requestDate}}</p>
   ```

   **Para WhatsApp:**
   - Conteúdo:
   ```
   *Nova Solicitação de Orçamento*

   Nome: {{name}}
   Email: {{email}}
   Telefone: {{phone}}
   Tipo de Site: {{websiteType}}

   Descrição: {{message}}

   Data: {{requestDate}}
   ```

#### Template para Cliente:

1. Crie outro template chamado "quote-request-confirmation"
2. Configure os canais:

   **Para Email:**
   - Assunto: "Recebemos sua solicitação - CodeBR"
   - Conteúdo:
   ```html
   <h2>Recebemos sua solicitação!</h2>
   <p>Olá {{name}},</p>
   <p>Agradecemos pelo interesse em nossos serviços. Sua solicitação de orçamento foi recebida com sucesso.</p>
   <p>Entraremos em contato em até 24 horas para discutir seu projeto.</p>
   <p>Atenciosamente,</p>
   <p>Equipe CodeBR</p>
   ```

   **Para WhatsApp (opcional):**
   - Conteúdo:
   ```
   *Recebemos sua solicitação!*

   Olá {{name}},

   Agradecemos pelo interesse em nossos serviços. Sua solicitação de orçamento foi recebida com sucesso.

   Entraremos em contato em até 24 horas para discutir seu projeto.

   Atenciosamente,
   Equipe CodeBR
   ```

### 5. Configurar Variáveis de Ambiente

Adicione as seguintes variáveis ao seu arquivo `.env`:

```
NOVU_API_KEY=sua_api_key_do_novu
ADMIN_EMAIL=seu_email@exemplo.com
ADMIN_EMAIL_ID=admin
ADMIN_PHONE=+5511999999999
```

## Testando as Notificações

Para testar se as notificações estão funcionando corretamente:

1. Preencha o formulário de orçamento no seu site
2. Verifique se você recebeu a notificação por email e WhatsApp
3. Verifique se o cliente recebeu o email de confirmação

## Solução de Problemas

Se as notificações não estiverem funcionando:

1. Verifique os logs do servidor para ver se há erros
2. Confirme se as variáveis de ambiente estão configuradas corretamente
3. Verifique no dashboard do Novu se os eventos estão sendo recebidos
4. Teste os templates de notificação diretamente no dashboard do Novu

## Recursos Adicionais

- [Documentação oficial do Novu](https://docs.novu.co/)
- [Exemplos de integração com Next.js](https://docs.novu.co/guides/next-js/)
