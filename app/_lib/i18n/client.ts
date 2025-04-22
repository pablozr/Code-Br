'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { defaultLanguage, languages } from './settings';

// Inicializar i18next para o lado do cliente
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => {
        console.log(`Loading translations for ${language}/${namespace}`);
        return import(`../../../public/locales/${language}/${namespace}.json`)
          .catch(error => {
            console.error(`Error loading translations for ${language}/${namespace}:`, error);
            return {};
          });
      }
    )
  )
  .init({
    // Recursos estáticos para garantir que as traduções básicas estejam disponíveis imediatamente
    resources: {
      'pt-BR': {
        common: {
          header: {
            home: 'Início',
            services: 'Serviços',
            about: 'Sobre',
            contact: 'Contato',
            quote: 'Solicitar Orçamento',
            language: 'Idioma'
          },
          hero: {
            title: 'Sites Profissionais que Convertem Visitantes em Clientes',
            description: 'Do conceito ao site pronto em semanas, sem complicações. Desenvolvemos websites que impulsionam seu negócio com design impactante e tecnologia de ponta.',
            cta: 'Solicitar Orçamento',
            examples: 'Ver Exemplos',
            badge: 'Criação de Sites Profissionais',
            projects: '+100 Projetos Entregues',
            support: 'Suporte Contínuo',
            delivery: 'Entrega em até 4 Semanas'
          }
        }
      },
      'en': {
        common: {
          header: {
            home: 'Home',
            services: 'Services',
            about: 'About',
            contact: 'Contact',
            quote: 'Request Quote',
            language: 'Language'
          },
          hero: {
            title: 'Professional Websites that Convert Visitors into Customers',
            description: 'From concept to finished website in weeks, without complications. We develop websites that boost your business with impactful design and cutting-edge technology.',
            cta: 'Request Quote',
            examples: 'View Examples',
            badge: 'Professional Website Creation',
            projects: '+100 Projects Delivered',
            support: 'Continuous Support',
            delivery: 'Delivery in up to 4 Weeks'
          }
        }
      },
      'fr': {
        common: {
          header: {
            home: 'Accueil',
            services: 'Services',
            about: 'À Propos',
            contact: 'Contact',
            quote: 'Demander un Devis',
            language: 'Langue'
          },
          hero: {
            title: 'Sites Web Professionnels qui Convertissent les Visiteurs en Clients',
            description: 'Du concept au site web fini en quelques semaines, sans complications. Nous développons des sites web qui stimulent votre entreprise avec un design percutant et une technologie de pointe.',
            cta: 'Demander un Devis',
            examples: 'Voir des Exemples',
            badge: 'Création de Sites Web Professionnels',
            projects: '+100 Projets Livrés',
            support: 'Support Continu',
            delivery: 'Livraison en 4 Semaines Maximum'
          }
        }
      }
    },
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: Object.keys(languages),
    defaultNS: 'common',
    fallbackNS: 'common',
    ns: ['common'],
    detection: {
      order: ['path', 'cookie', 'navigator'],
      lookupCookie: 'i18next',
      lookupFromPathIndex: 1, // Usar o segundo segmento da URL (após o idioma)
      caches: ['cookie'],
      // Desativar redirecionamento automático no cliente
      cookieExpirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 dias
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
