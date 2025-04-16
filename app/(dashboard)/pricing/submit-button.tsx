'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export function SubmitButton({ isCustom }: { isCustom?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      variant="outline"
      className="w-full rounded-full border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Carregando...
        </>
      ) : isCustom ? (
        <>
          Solicitar orçamento
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      ) : (
        <>
          Contratar serviço
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}
