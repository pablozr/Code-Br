'use client';

import { authConfig } from '@/app/(auth)/auth-config';

import { SignUp } from '@clerk/nextjs';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function SignUpPage() {
  return (
    <AuroraBackground>
      <div className="min-h-[100dvh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          <SignUp
            appearance={{
              elements: {
                rootBox: 'mx-auto w-full',
                card: 'bg-[#0A0A0A] shadow-xl border border-[rgba(118,65,192,0.3)] backdrop-blur-md rounded-lg overflow-hidden',
                headerTitle: 'text-white text-2xl font-bold',
                headerSubtitle: 'text-gray-400',
                formButtonPrimary: '',
                formFieldLabel: '',
                formFieldInput: '',
                footerActionLink: 'text-[#9969E5] hover:text-[#7641C0] font-medium',
                identityPreviewText: 'text-white',
                identityPreviewEditButton: 'text-[#9969E5] hover:text-[#7641C0]',
                socialButtonsIconButton: '',
                socialButtonsBlockButton: '',
                dividerLine: '',
                dividerText: '',
                formFieldAction: 'text-[#9969E5] hover:text-[#7641C0]',
                formFieldErrorText: 'text-red-400',
                formFieldSuccessText: 'text-green-400',
                otpCodeFieldInput: '',
              },
              layout: {
                logoPlacement: 'inside',
                logoImageUrl: '/logo.svg',
                showOptionalFields: true,
                socialButtonsVariant: 'iconButton',
              },
              variables: {
                colorPrimary: '#9969E5',
                colorBackground: '#0A0A0A',
                colorText: '#FFFFFF',
                colorTextSecondary: '#A9A9A9',
                colorInputBackground: 'rgba(30, 30, 30, 0.5)',
                colorInputText: '#FFFFFF',
                fontFamily: 'Manrope, sans-serif',
                borderRadius: '0.5rem',
                spacingUnit: '0.75rem',
              },
            }}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl={authConfig.redirects.afterSignIn}
            localization={{
              socialButtonsBlockButton: {
                dividerText: "ou continue com",
              },
              formTitle: "Sign up for CodeBR",
              signUp: {
                start: {
                  title: "Sign up for CodeBR",
                  subtitle: "Crie sua conta com email ou escolha uma das opções abaixo",
                },
              },
            }}
          >
            <SignUp.OauthStrategy provider="google" />
            <SignUp.OauthStrategy provider="apple" />
            <SignUp.OauthStrategy provider="microsoft" />
          </SignUp>
        </div>
      </div>
    </AuroraBackground>
  );
}
