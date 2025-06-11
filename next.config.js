/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de performance
  experimental: {
    ppr: true,
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', '@tabler/icons-react', 'framer-motion'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Otimizações de bundle
  webpack: (config, { dev, isServer }) => {
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



  // Configurações de build
  output: 'standalone',
  generateEtags: false,
  
  // Configurações de desenvolvimento
  ...(process.env.NODE_ENV === 'development' && {
    reactStrictMode: true,
  }),
};

module.exports = nextConfig;
