'use client';

import { useEffect } from 'react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SSOCallbackPage() {
  const { isLoaded: isSignInLoaded, signIn, setActive: setActiveSignIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp, setActive: setActiveSignUp } = useSignUp();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract the "strategy" query parameter
    const strategy = searchParams.get('strategy');

    // Handle the OAuth callback for sign-in
    if (isSignInLoaded && strategy) {
      signIn.authenticateWithRedirect({
        strategy: strategy as 'oauth_google' | 'oauth_github',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard',
      });
    }

    // Handle the OAuth callback for sign-up
    if (isSignUpLoaded && strategy) {
      signUp.authenticateWithRedirect({
        strategy: strategy as 'oauth_google' | 'oauth_github',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard',
      });
    }
  }, [isSignInLoaded, isSignUpLoaded, signIn, signUp, searchParams, router]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-black text-white">
      <div className="animate-pulse">Redirecionando...</div>
    </div>
  );
}
