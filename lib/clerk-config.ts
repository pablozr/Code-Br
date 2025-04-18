// Configurações do Clerk para redirecionamento
export const clerkRedirects = {
  // Redirecionamento após login
  afterSignIn: '/dashboard',
  
  // Redirecionamento após registro
  afterSignUp: '/dashboard',
  
  // Redirecionamento após logout
  afterSignOut: '/',
  
  // Redirecionamento se o usuário tentar acessar uma página protegida sem estar autenticado
  signInUrl: '/sign-in',
  
  // Redirecionamento se o usuário tentar acessar a página de login estando autenticado
  signUpUrl: '/sign-up',
};
