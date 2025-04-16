import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-black">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <Globe className="size-12 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Página Não Encontrada
        </h1>
        <p className="text-base text-gray-300">
          A página que você está procurando pode ter sido removida, teve seu nome
          alterado ou está temporariamente indisponível.
        </p>
        <Link
          href="/"
          className="max-w-48 mx-auto flex justify-center py-2 px-4 border border-gray-700 rounded-full shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
        >
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}
