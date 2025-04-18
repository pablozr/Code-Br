# CodeBR - Websites Suíços

![CodeBR Logo](public/logo.png)

## 📋 Visão Geral

CodeBR é uma plataforma SaaS especializada em serviços de criação de websites de alta qualidade, incluindo landing pages, e-commerce, lojas virtuais e orçamentos personalizados. Nosso diferencial é a precisão e qualidade suíça, oferecendo soluções robustas e elegantes para nossos clientes.

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilização**: Mantine UI, TailwindCSS
- **Animações**: Framer Motion
- **Efeitos Visuais**: Three.js, tsParticles
- **Autenticação**: NextAuth.js
- **Banco de Dados**: PostgreSQL com Drizzle ORM
- **Infraestrutura**: Docker para desenvolvimento local

## 🏗️ Estrutura do Projeto

```
codebr-website/
├── app/                      # Diretório principal do Next.js App Router
│   ├── (dashboard)/          # Grupo de rotas para o dashboard (área logada)
│   │   ├── dashboard/         # Páginas do dashboard
│   │   ├── pricing/           # Página de preços
│   │   ├── home-ui.tsx        # Componente principal da página inicial
│   │   └── page.tsx           # Página inicial
│   ├── (login)/              # Grupo de rotas para autenticação
│   │   ├── sign-in/           # Página de login
│   │   ├── sign-up/           # Página de cadastro
│   │   └── actions.ts         # Ações de autenticação
│   ├── api/                  # Rotas de API
│   │   └── stripe/            # Integração com Stripe
│   ├── globals.css           # Estilos globais
│   ├── layout.tsx            # Layout principal da aplicação
│   └── not-found.tsx         # Página 404
│
├── components/               # Componentes reutilizáveis
│   ├── effects/              # Efeitos visuais (partículas, animações)
│   │   ├── AnimatedText.tsx    # Texto com animação
│   │   ├── BlackHoleEffect.tsx # Efeito de buraco negro
│   │   ├── GlowEffect.tsx      # Efeito de brilho
│   │   ├── ParticlesBackground.tsx # Fundo com partículas
│   │   └── Tilt3DEffect.tsx    # Efeito 3D de inclinação
│   ├── layout/               # Componentes de layout
│   │   ├── Footer.tsx         # Rodapé do site
│   │   └── Header.tsx         # Cabeçalho do site
│   ├── ui/                   # Componentes de UI reutilizáveis
│   │   ├── aurora-background.tsx # Fundo com efeito aurora
│   │   ├── CodeTitle.tsx       # Título com efeito de código
│   │   ├── colourful-text.tsx  # Texto com cores gradientes
│   │   └── gradient-text.tsx   # Texto com gradiente
│   ├── CtaSection.tsx        # Seção de chamada para ação
│   ├── HeroSection.tsx       # Seção principal da página inicial
│   ├── ModernWorkflowSection.tsx # Seção de fluxo de trabalho
│   ├── PricingSection.tsx    # Seção de preços
│   ├── ServicesSection.tsx   # Seção de serviços
│   └── TrustSignals.tsx      # Seção de sinais de confiança
│
├── lib/                      # Utilitários e configurações
│   ├── auth/                 # Configuração de autenticação
│   ├── db/                   # Configuração do banco de dados
│   ├── payments/             # Integração com pagamentos
│   └── utils.ts              # Funções utilitárias
│
├── public/                   # Arquivos estáticos
│
├── styles/                   # Estilos adicionais
│
├── .env                      # Variáveis de ambiente (não versionado)
├── .env.example              # Exemplo de variáveis de ambiente
└── docker-compose.yml        # Configuração do Docker
```

## 🔍 Detalhamento dos Componentes

### Página Inicial (Landing Page)

A página inicial é composta pelos seguintes componentes principais:

1. **HeroSection** (`components/HeroSection.tsx`)
   - Seção principal com título, subtítulo e CTA
   - Inclui o componente `HeroNotebookSimulator` que exibe uma simulação de notebook
   - Utiliza o efeito `BlackHoleAnimation` para criar um efeito visual impressionante

2. **TrustSignals** (`components/TrustSignals.tsx`)
   - Exibe logos e sinais de confiança de parceiros e clientes
   - Design moderno com animações suaves

3. **ServicesSection** (`components/ServicesSection.tsx`)
   - Apresenta os serviços oferecidos com cards interativos
   - Efeitos de hover e animações para melhorar a experiência do usuário

4. **ModernWorkflowSection** (`components/ModernWorkflowSection.tsx`)
   - Demonstra o processo de trabalho com animações e mockups
   - Transição automática entre etapas do workflow
   - Mockups interativos que ilustram cada fase do processo

5. **PricingSection** (`components/PricingSection.tsx`)
   - Exibe opções de preços e planos disponíveis
   - Configurado para solicitar orçamentos personalizados
   - Cards com efeitos visuais e destaque para planos recomendados

6. **CtaSection** (`components/CtaSection.tsx`)
   - Call-to-action final para conversão de leads
   - Fundo com efeito de partículas e gradiente
   - Botões com efeitos de hover

### Componentes de Layout

1. **Header** (`components/layout/Header.tsx`)
   - Navegação principal e logo
   - Links para login e cadastro
   - Design responsivo com menu mobile

2. **Footer** (`components/layout/Footer.tsx`)
   - Informações de contato, links úteis e redes sociais
   - Organizado em seções para fácil navegação
   - Botão de voltar ao topo

### Componentes de UI

Os componentes de UI estão localizados em `components/ui/` e incluem:

1. **aurora-background** - Fundo com efeito de aurora boreal
2. **CodeTitle** - Título com efeito de código/terminal
3. **colourful-text** - Texto com cores gradientes e animações
4. **gradient-text** - Texto com gradiente personalizável

### Efeitos Visuais

Os efeitos visuais estão localizados em `components/effects/` e incluem:

1. **BlackHoleEffect** - Efeito visual de buraco negro com distorção gravitacional
2. **BlackHoleAnimation** - Animação otimizada do buraco negro
3. **ParticlesBackground** - Animação de partículas que orbitam e interagem
4. **AnimatedText** - Texto com animações de entrada
5. **Tilt3DEffect** - Efeito 3D de inclinação para elementos interativos
6. **GlowEffect** - Efeito de brilho para elementos UI

## 🔐 Sistema de Autenticação (A Implementar)

O sistema de autenticação está parcialmente implementado usando NextAuth.js. As rotas e componentes relacionados estão organizados em:

- `app/(login)/` - Contém as páginas de login e cadastro
- `lib/auth/` - Configuração do NextAuth.js

### Estrutura Atual:

1. **Página de Login** (`app/(login)/sign-in/page.tsx`)
   - Interface básica para login de usuários
   - Integração com NextAuth.js

2. **Página de Cadastro** (`app/(login)/sign-up/page.tsx`)
   - Interface para registro de novos usuários
   - Validação de formulário

3. **Ações de Autenticação** (`app/(login)/actions.ts`)
   - Funções de servidor para login e registro

### Implementação Pendente:

1. **Aprimoramento do Formulário de Login** - Melhorar a validação e feedback ao usuário
2. **Recuperação de Senha** - Adicionar funcionalidade de reset de senha
3. **Integração com Provedores** - Configurar login social (Google, GitHub)
4. **Proteção de Rotas** - Implementar middleware para proteção de rotas autenticadas

## 📊 Dashboard (A Implementar)

O dashboard está parcialmente estruturado e será a área administrativa para usuários logados, localizado em `app/(dashboard)/`:

### Estrutura Atual:

1. **Layout do Dashboard** (`app/(dashboard)/dashboard/layout.tsx`)
   - Estrutura básica com sidebar e área de conteúdo

2. **Página Principal** (`app/(dashboard)/dashboard/page.tsx`)
   - Visão geral das atividades e projetos

3. **Páginas de Configuração**
   - Segurança (`app/(dashboard)/dashboard/security/page.tsx`)
   - Atividade (`app/(dashboard)/dashboard/activity/page.tsx`)
   - Geral (`app/(dashboard)/dashboard/general/page.tsx`)

### Implementação Pendente:

1. **Aprimoramento do Layout** - Melhorar a experiência do usuário e responsividade
2. **Página de Perfil** - Gerenciamento de informações do usuário
3. **Gerenciamento de Projetos** - CRUD para projetos do cliente
4. **Acompanhamento de Status** - Visualização do progresso dos projetos
5. **Pagamentos** - Integração com gateway de pagamento (Stripe)

## 🔄 Fluxo de Trabalho Recomendado

1. **Configuração Inicial**:
   ```bash
   # Clonar o repositório
   git clone [url-do-repositorio]

   # Instalar dependências
   npm install

   # Configurar variáveis de ambiente
   cp .env.example .env
   # Editar .env com suas configurações

   # Iniciar o banco de dados
   docker-compose up -d

   # Iniciar o servidor de desenvolvimento
   npm run dev --turbopack
   ```

2. **Desenvolvimento de Novas Funcionalidades**:
   - Criar branch específica: `git checkout -b feature/nome-da-feature`
   - Implementar a funcionalidade
   - Testar localmente
   - Fazer commit e push: `git push origin feature/nome-da-feature`

## 🎨 Guia de Estilo

### Cores Principais

- **Preto Base**: `#0A0A0A` - Fundo principal
- **Roxo Primário**: `#9969E5` - Cor de destaque principal
- **Roxo Secundário**: `#7641C0` - Cor de destaque secundária
- **Branco**: `#FFFFFF` - Texto principal
- **Cinza Claro**: `#A9A9A9` - Texto secundário

### Tipografia

- **Títulos**: Inter, peso 700-800
- **Corpo**: Inter, peso 400-500
- **Tamanhos**:
  - Título Principal: 3.5rem
  - Subtítulos: 2rem - 2.5rem
  - Corpo: 1rem - 1.2rem

### Componentes UI

Utilizamos o Mantine UI como biblioteca principal de componentes. Para manter a consistência:

1. **Botões**:
   - Primário: Gradiente roxo com bordas arredondadas
   - Secundário: Outline branco/roxo
   - Componente personalizado: `TechButton` para botões com efeitos avançados

2. **Cards**:
   - Fundo escuro com bordas sutis
   - Efeito de hover com elevação
   - Bordas com gradiente ou glow em destaque

3. **Efeitos de Texto**:
   - `CodeTitle` para títulos com efeito de código
   - `GradientText` para texto com gradiente personalizável
   - `colourful-text` para texto com cores gradientes animadas

## 📝 Convenções de Código

1. **Nomenclatura**:
   - Componentes: PascalCase
   - Funções e variáveis: camelCase
   - Constantes: UPPER_SNAKE_CASE

2. **Organização de Arquivos**:
   - Um componente por arquivo
   - Componentes de UI em `components/ui/`
   - Efeitos visuais em `components/effects/`
   - Componentes de layout em `components/layout/`
   - Seções da página principal na raiz de `components/`

3. **Estilização**:
   - Preferir estilos inline do Mantine
   - Usar TailwindCSS para ajustes finos
   - Animações com Framer Motion

## 💻 Próximos Passos

1. **Implementação do Sistema de Autenticação**
   - Finalizar formulários de login e cadastro
   - Implementar recuperação de senha
   - Adicionar provedores sociais

2. **Desenvolvimento do Dashboard**
   - Criar interface para gerenciamento de projetos
   - Implementar visualização de status
   - Integrar sistema de pagamentos

3. **Melhorias de Performance**
   - Otimizar carregamento de imagens
   - Implementar lazy loading para componentes pesados
   - Melhorar a responsividade em dispositivos móveis

## 📚 Recursos Adicionais

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Mantine UI](https://mantine.dev/)
- [Documentação do Framer Motion](https://www.framer.com/motion/)
- [Documentação do NextAuth.js](https://next-auth.js.org/)
- [Documentação do Drizzle ORM](https://orm.drizzle.team/)
- [Documentação do Three.js](https://threejs.org/docs/)
- [Documentação do tsParticles](https://particles.js.org/docs/)

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido com ❤️ por CodeBR
