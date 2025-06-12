/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de performance
  experimental: {
    // Desabilitar PPR temporariamente para resolver problemas de manifest no Vercel
    // ppr: true,
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', '@tabler/icons-react', 'framer-motion'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    // Configurações específicas para resolver problemas de manifest
    serverComponentsExternalPackages: [],
    esmExternals: 'loose',
  },

  // Otimizações de bundle
  webpack: (config, { dev, isServer, webpack }) => {
    // Configurações específicas para resolver problemas de manifest no Vercel
    if (process.env.VERCEL && !dev) {
      // Garantir que os manifests sejam gerados corretamente
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.VERCEL': JSON.stringify(process.env.VERCEL),
        })
      );

      // Plugin personalizado para garantir a geração do client reference manifest
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap('ClientReferenceManifestPlugin', () => {
            // Garantir que o diretório de manifests existe
            const fs = require('fs');
            const path = require('path');

            const manifestDir = path.join(process.cwd(), '.next/server/app/[locale]/(marketing)');
            if (!fs.existsSync(manifestDir)) {
              fs.mkdirSync(manifestDir, { recursive: true });
            }

            // Criar um manifest vazio se não existir
            const manifestPath = path.join(manifestDir, 'page_client-reference-manifest.js');
            if (!fs.existsSync(manifestPath)) {
              fs.writeFileSync(manifestPath, 'module.exports = {};');
            }
          });
        }
      });
    }

    // Otimizações para produção
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            mantine: {
              test: /[\\/]node_modules[\\/]@mantine[\\/]/,
              name: 'mantine',
              chunks: 'all',
              priority: 20,
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 20,
            },
            icons: {
              test: /[\\/]node_modules[\\/]@tabler[\\/]icons-react[\\/]/,
              name: 'icons',
              chunks: 'all',
              priority: 20,
            },
          },
        },
      };

      // Tree shaking mais agressivo
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    // Otimizar importações de ícones
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    };

    return config;
  },

  // Compressão e otimizações
  compress: true,
  poweredByHeader: false,
  
  // Headers de performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  // Imagens otimizadas
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },



  // Configurações de build - ajustadas para Vercel
  output: process.env.VERCEL ? undefined : 'standalone',
  generateEtags: false,

  // Configurações específicas para resolver problemas de manifest no Vercel
  ...(process.env.VERCEL && {
    distDir: '.next',
    trailingSlash: false,
    skipTrailingSlashRedirect: true,
    // Configurações adicionais para estabilidade no Vercel
    swcMinify: true,
    modularizeImports: {
      '@tabler/icons-react': {
        transform: '@tabler/icons-react/dist/esm/icons/{{member}}.mjs',
      },
    },
  }),
  
  // Configurações de desenvolvimento
  ...(process.env.NODE_ENV === 'development' && {
    reactStrictMode: true,
  }),
};

module.exports = nextConfig;
