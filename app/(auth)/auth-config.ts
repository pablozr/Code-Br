// Configurações de autenticação para o Clerk
export const authConfig = {
  // Redirecionamentos
  redirects: {
    // Após login
    afterSignIn: '/dashboard',
    
    // Após registro
    afterSignUp: '/dashboard',
    
    // Após logout
    afterSignOut: '/',
    
    // URL de login
    signIn: '/sign-in',
    
    // URL de cadastro
    signUp: '/sign-up',
  },
};
