# Guia de Imagens para o Projeto CodeBR

## Imagens Críticas Necessárias

### 1. Imagens de Background
- **hero-bg.webp** (1920x1080px) - Imagem de fundo para a seção hero
- **services-bg.webp** (1920x1080px) - Imagem de fundo para a seção de serviços

### 2. Ícones do Manifest (PWA)
- **android-chrome-192x192.png** (192x192px) - Ícone para Android
- **android-chrome-512x512.png** (512x512px) - Ícone para Android (alta resolução)

### 3. Imagens do Portfólio
Localizadas em `/public/images/portfolio/`:
- **landingpage1.webp** - Template de landing page
- **ecommerce1.webp** - Template de e-commerce
- **institucional1.webp** - Template institucional

## Formatos Recomendados

### Para Web
- **WebP**: Formato preferido para imagens web (melhor compressão)
- **AVIF**: Formato alternativo para navegadores compatíveis
- **PNG**: Para ícones e imagens com transparência
- **JPG**: Para fotos quando WebP não for suportado

### Tamanhos Recomendados
- **Hero/Background**: 1920x1080px (16:9)
- **Portfólio**: 800x600px (4:3)
- **Ícones**: Múltiplos tamanhos (16x16, 32x32, 192x192, 512x512)

## Como Substituir os Placeholders

1. **Substitua os arquivos placeholder** pelos arquivos reais mantendo os mesmos nomes
2. **Mantenha os formatos** especificados (WebP para imagens, PNG para ícones)
3. **Otimize as imagens** antes de adicionar:
   - Use ferramentas como TinyPNG, Squoosh, ou ImageOptim
   - Mantenha qualidade entre 80-90% para WebP
   - Para PNG, use compressão sem perda

## Configurações de Otimização

O projeto está configurado para:
- **Lazy loading** automático para imagens não críticas
- **Preload** de imagens críticas
- **Fallbacks** para imagens que falharem ao carregar
- **Múltiplos formatos** (AVIF, WebP, fallback para PNG/JPG)

## Troubleshooting

### Imagens não carregam na Vercel
- ✅ Verificar se a pasta `public` não está no `.vercelignore`
- ✅ Confirmar que os caminhos estão corretos (começando com `/`)
- ✅ Verificar se os arquivos existem no repositório
- ✅ Confirmar que o deploy incluiu os arquivos

### Performance
- Use **WebP** sempre que possível
- Implemente **lazy loading** para imagens abaixo da dobra
- Configure **preload** apenas para imagens críticas
- Mantenha **tamanhos apropriados** para cada viewport
