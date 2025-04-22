import { defaultLanguage } from '../_lib/i18n/settings';

// Esta página não deve ser renderizada diretamente
// O middleware irá redirecionar para a página com o idioma correto
export default function OrcamentoRedirect() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Redirecionando...</h1>
      <p>Você será redirecionado para a página de orçamento.</p>
    </div>
  );
}
