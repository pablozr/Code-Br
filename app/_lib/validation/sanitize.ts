/**
 * Funções para sanitização de dados de entrada
 * Estas funções ajudam a prevenir ataques de injeção e XSS
 */

/**
 * Sanitiza uma string para prevenir ataques XSS
 * @param input A string a ser sanitizada
 * @returns A string sanitizada
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  
  // Remover tags HTML
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Escapar caracteres especiais
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
  
  return sanitized;
}

/**
 * Sanitiza um email
 * @param email O email a ser sanitizado
 * @returns O email sanitizado
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  // Remover espaços em branco
  let sanitized = email.trim();
  
  // Converter para minúsculas
  sanitized = sanitized.toLowerCase();
  
  // Remover caracteres inválidos
  sanitized = sanitized.replace(/[^a-z0-9@._-]/g, '');
  
  return sanitized;
}

/**
 * Sanitiza um número de telefone
 * @param phone O número de telefone a ser sanitizado
 * @returns O número de telefone sanitizado
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  
  // Remover caracteres não numéricos, exceto + no início
  return phone.replace(/[^\d+]/g, '');
}

/**
 * Sanitiza um objeto inteiro
 * @param data O objeto a ser sanitizado
 * @returns O objeto sanitizado
 */
export function sanitizeObject<T extends Record<string, any>>(data: T): T {
  const sanitized: Record<string, any> = {};
  
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      
      if (typeof value === 'string') {
        // Sanitizar strings com base no tipo de campo
        if (key.includes('email')) {
          sanitized[key] = sanitizeEmail(value);
        } else if (key.includes('phone') || key.includes('telefone')) {
          sanitized[key] = sanitizePhone(value);
        } else {
          sanitized[key] = sanitizeString(value);
        }
      } else if (typeof value === 'object' && value !== null) {
        // Sanitizar objetos aninhados
        if (Array.isArray(value)) {
          sanitized[key] = value.map((item: any) =>
            typeof item === 'string' ? sanitizeString(item) :
            typeof item === 'object' ? sanitizeObject(item) :
            item
          );
        } else {
          sanitized[key] = sanitizeObject(value);
        }
      } else {
        // Manter outros tipos de dados como estão
        sanitized[key] = value;
      }
    }
  }
  
  return sanitized as T;
}
