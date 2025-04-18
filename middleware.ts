import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Rotas públicas que não requerem autenticação
const isPublicRoute = createRouteMatcher([
  '/',                // Página inicial
  '/sign-in(.*)',     // Página de login e suas sub-rotas
  '/sign-up(.*)',     // Página de cadastro e suas sub-rotas
  '/pricing',         // Página de preços
  '/api/webhooks(.*)', // Webhooks do Clerk
  '/sso-callback(.*)', // Callback para SSO
]);

export default clerkMiddleware(async (auth, req) => {
  // Se não for uma rota pública, protege com autenticação
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
