# CodeBR - Websites Suíços

![CodeBR Logo](public/logo.png)

## 📋 Visão Geral

CodeBR é uma plataforma especializada em serviços de criação de websites de alta qualidade, incluindo landing pages, e-commerce, lojas virtuais e orçamentos personalizados. Nosso diferencial é a precisão e qualidade suíça, oferecendo soluções robustas e elegantes para nossos clientes.

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilização**: Mantine UI, TailwindCSS
- **Animações**: Framer Motion
- **Efeitos Visuais**: Three.js, tsParticles
- **Banco de Dados**: PostgreSQL com Drizzle ORM
- **Infraestrutura**: Docker para desenvolvimento local

## 🏗️ Estrutura do Projeto

```
codebr-website/
├── app/                      # Diretório principal do Next.js App Router
│   ├── [locale]/             # Rotas internacionalizadas
│   │   ├── (marketing)/       # Grupo de rotas de marketing
│   │   ├── contact/           # Página de contato
│   │   ├── orcamento/         # Página de orçamento
│   │   └── page.tsx           # Página inicial
│   ├── _components/          # Componentes organizados
│   │   ├── effects/           # Efeitos visuais (partículas, animações)
│   │   ├── layout/            # Componentes de layout (Header, Footer)
│   │   ├── sections/          # Seções da página principal
│   │   ├── seo/               # Componentes de SEO
│   │   └── ui/                # Componentes de UI reutilizáveis
│   ├── _actions/             # Ações do servidor
│   ├── _lib/                 # Bibliotecas e utilitários
│   │   ├── i18n/              # Configuração de internacionalização
│   │   ├── notifications/     # Sistema de notificações
│   │   ├── security/          # Configurações de segurança
│   │   ├── utils/             # Funções utilitárias
│   │   └── validation/        # Schemas de validação
│   ├── _styles/              # Estilos organizados
│   │   ├── components/        # Estilos de componentes
│   │   └── effects/           # Estilos de efeitos
│   ├── api/                  # Rotas de API
│   ├── globals.css           # Estilos globais
│   └── layout.tsx            # Layout principal da aplicação
│
├── lib/                      # Configurações do banco de dados
│   └── db/                   # Configuração do banco de dados
│
├── public/                   # Arquivos estáticos
│
├── .env                      # Variáveis de ambiente (não versionado)
├── .env.example              # Exemplo de variáveis de ambiente
└── docker-compose.yml        # Configuração do Docker
```

## 🔍 Detalhamento dos Componentes

### Página Inicial (Landing Page)

A página inicial é composta pelos seguintes componentes principais:

1. **HeroSection** (`app/_components/sections/HeroSection.tsx`)
   - Seção principal com título, subtítulo e CTA
   - Inclui o componente `HeroNotebookSimulator` que exibe uma simulação de notebook
   - Utiliza o efeito `BlackHoleAnimation` para criar um efeito visual impressionante

2. **TrustSignals** (`app/_components/sections/TrustSignals.tsx`)
   - Exibe logos e sinais de confiança de parceiros e clientes
   - Design moderno com animações suaves

3. **ServicesSection** (`app/_components/sections/ServicesSection.tsx`)
   - Apresenta os serviços oferecidos com cards interativos
   - Efeitos de hover e animações para melhorar a experiência do usuário

4. **ModernWorkflowSection** (`app/_components/sections/ModernWorkflowSection.tsx`)
   - Explica o processo de trabalho da empresa
   - Utiliza animações e ilustrações para tornar a explicação mais visual

5. **CtaSection** (`app/_components/sections/CtaSection.tsx`)
   - Seção final com chamada para ação
   - Design impactante para incentivar o contato

### Efeitos Visuais

O projeto utiliza diversos efeitos visuais para criar uma experiência imersiva:

1. **BlackHoleEffect** - Efeito visual de buraco negro com distorção gravitacional
2. **ParallaxEffect** - Efeito de paralaxe para elementos em movimento
3. **TechButton** - Botões com efeitos visuais avançados
4. **LazyEffect** - Carregamento otimizado de efeitos visuais
5. **ParticlesWrapper** - Sistema de partículas otimizado
6. **GradientText** - Texto com gradientes animados

## 📝 Formulário de Contato

O site inclui um formulário de contato completo que permite aos visitantes enviar mensagens diretamente para a equipe. O formulário:

- Valida os dados de entrada usando Zod
- Armazena as solicitações no banco de dados PostgreSQL
- Fornece feedback visual ao usuário sobre o status do envio

O formulário está implementado em:

1. **Página de Contato** (`app/(dashboard)/contact/page.tsx`)
   - Interface principal para o formulário de contato
   - Informações de contato adicionais

2. **Componente de Formulário** (`app/_components/ui/ContactForm.tsx`)
   - Implementação do formulário com validação
   - Feedback visual para o usuário

3. **Ações do Servidor** (`app/_actions/contact.ts`)
   - Funções do servidor para processar o formulário
   - Integração com o banco de dados

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

   # Configurar o banco de dados
   npm run db:setup
   npm run db:seed

   # Iniciar o servidor de desenvolvimento
   npm run dev
   ```

2. **Organização de Arquivos**:
   - Um componente por arquivo
   - Componentes de UI em `app/_components/ui/`
   - Efeitos visuais em `app/_components/effects/`
   - Componentes de layout em `app/_components/layout/`
   - Seções da página principal em `app/_components/sections/`

3. **Estilização**:
   - Preferir estilos inline do Mantine
   - Usar TailwindCSS para ajustes finos
   - Animações com Framer Motion

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
   - Componentes de UI em `app/_components/ui/`
   - Efeitos visuais em `app/_components/effects/`
   - Componentes de layout em `app/_components/layout/`
   - Seções da página principal em `app/_components/sections/`

3. **Estilização**:
   - Preferir estilos inline do Mantine
   - Usar TailwindCSS para ajustes finos
   - Animações com Framer Motion

## 💻 Próximos Passos

1. **Melhorias de Performance**
   - Otimizar carregamento de imagens
   - Implementar lazy loading para componentes pesados
   - Melhorar a responsividade em dispositivos móveis

2. **Expansão de Conteúdo**
   - Adicionar mais páginas informativas
   - Criar um blog para compartilhar conhecimento
   - Expandir a seção de portfólio

## 📚 Recursos Adicionais

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Mantine UI](https://mantine.dev/)
- [Documentação do Framer Motion](https://www.framer.com/motion/)
- [Documentação do Drizzle ORM](https://orm.drizzle.team/)
- [Documentação do Three.js](https://threejs.org/docs/)
- [Documentação do tsParticles](https://particles.js.org/docs/)

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido com ❤️ por CodeBR
