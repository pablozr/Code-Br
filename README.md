# CodeBR - Websites Suíços

![CodeBR Logo](public/logo.png)

## 📋 Visão Geral

CodeBR é uma plataforma SaaS especializada em serviços de criação de websites de alta qualidade, incluindo landing pages, e-commerce, lojas virtuais e orçamentos personalizados. Nosso diferencial é a precisão e qualidade suíça, oferecendo soluções robustas e elegantes para nossos clientes.

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilização**: Mantine UI, TailwindCSS
- **Animações**: Framer Motion
- **Autenticação**: NextAuth.js
- **Banco de Dados**: PostgreSQL com Drizzle ORM
- **Infraestrutura**: Docker para desenvolvimento local

## 🏗️ Estrutura do Projeto

```
codebr-website/
├── app/                      # Diretório principal do Next.js App Router
│   ├── (dashboard)/          # Grupo de rotas para o dashboard (área logada)
│   ├── (login)/              # Grupo de rotas para autenticação
│   ├── api/                  # Rotas de API
│   ├── globals.css           # Estilos globais
│   └── layout.tsx            # Layout principal da aplicação
│
├── components/               # Componentes reutilizáveis
│   ├── effects/              # Efeitos visuais (partículas, animações)
│   ├── layout/               # Componentes de layout (Header, Footer)
│   ├── ui/                   # Componentes de UI reutilizáveis
│   └── [NomeDoComponente].tsx # Componentes específicos de seções
│
├── lib/                      # Utilitários e configurações
│   ├── auth/                 # Configuração de autenticação
│   ├── db/                   # Configuração do banco de dados
│   └── utils/                # Funções utilitárias
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

2. **TrustSignals** (`components/TrustSignals.tsx`)
   - Exibe logos e sinais de confiança de parceiros e clientes

3. **ServicesSection** (`components/ServicesSection.tsx`)
   - Apresenta os serviços oferecidos com cards interativos

4. **ModernWorkflowSection** (`components/ModernWorkflowSection.tsx`)
   - Demonstra o processo de trabalho com animações e mockups
   - Transição automática entre etapas do workflow

5. **PricingSection** (`components/PricingSection.tsx`)
   - Exibe opções de preços e planos disponíveis
   - Configurado para solicitar orçamentos personalizados

6. **CtaSection** (`components/CtaSection.tsx`)
   - Call-to-action final para conversão de leads

7. **Footer** (`components/layout/Footer.tsx`)
   - Rodapé com links, informações de contato e copyright

### Componentes de Layout

1. **Header** (`components/layout/Header.tsx`)
   - Navegação principal e logo
   - Links para login e cadastro

2. **Footer** (`components/layout/Footer.tsx`)
   - Informações de contato, links úteis e redes sociais

### Efeitos Visuais

Os efeitos visuais estão localizados em `components/effects/` e incluem:

1. **BlackHoleEffect** - Efeito visual de buraco negro com distorção gravitacional
2. **ParticlesEffect** - Animação de partículas que orbitam e interagem
3. **MatrixEffect** - Efeito de código estilo Matrix
4. **CircuitEffect** - Visualização de circuitos com efeitos neon

## 🔐 Sistema de Autenticação (A Implementar)

O sistema de autenticação será implementado usando NextAuth.js. As rotas e componentes relacionados estão organizados em:

- `app/(login)/` - Contém as páginas de login, cadastro e recuperação de senha
- `lib/auth/` - Configuração do NextAuth.js

### Implementação Pendente:

1. **Formulário de Login** - Criar formulário com validação
2. **Cadastro de Usuários** - Implementar fluxo de registro
3. **Recuperação de Senha** - Adicionar funcionalidade de reset de senha
4. **Integração com Provedores** - Configurar login social (Google, GitHub)

## 📊 Dashboard (A Implementar)

O dashboard será a área administrativa para usuários logados, localizado em `app/(dashboard)/`:

### Implementação Pendente:

1. **Layout do Dashboard** - Criar estrutura com sidebar e área de conteúdo
2. **Página de Perfil** - Gerenciamento de informações do usuário
3. **Gerenciamento de Projetos** - CRUD para projetos do cliente
4. **Acompanhamento de Status** - Visualização do progresso dos projetos
5. **Pagamentos** - Integração com gateway de pagamento

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
   npm run dev
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

2. **Cards**:
   - Fundo escuro com bordas sutis
   - Efeito de hover com elevação

3. **Inputs**:
   - Estilo minimalista com foco roxo
   - Validação visual clara

## 📝 Convenções de Código

1. **Nomenclatura**:
   - Componentes: PascalCase
   - Funções e variáveis: camelCase
   - Constantes: UPPER_SNAKE_CASE

2. **Organização de Arquivos**:
   - Um componente por arquivo
   - Agrupar por funcionalidade

3. **Estilização**:
   - Preferir estilos inline do Mantine
   - Usar TailwindCSS para ajustes finos

## 🧪 Testes (A Implementar)

Implementar testes usando:
- Jest para testes unitários
- React Testing Library para testes de componentes
- Cypress para testes E2E

## 📚 Recursos Adicionais

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Mantine UI](https://mantine.dev/)
- [Documentação do Framer Motion](https://www.framer.com/motion/)
- [Documentação do NextAuth.js](https://next-auth.js.org/)
- [Documentação do Drizzle ORM](https://orm.drizzle.team/)

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido com ❤️ por CodeBR
