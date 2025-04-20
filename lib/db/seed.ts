import { db } from './drizzle';
import { contactRequests } from './schema';

async function seed() {
  // Seed some example contact requests
  await db
    .insert(contactRequests)
    .values([
      {
        name: 'João Silva',
        email: 'joao@example.com',
        message: 'Gostaria de um orçamento para uma landing page para minha empresa de consultoria.',
        status: 'pending'
      },
      {
        name: 'Maria Oliveira',
        email: 'maria@example.com',
        message: 'Preciso de um site de e-commerce para minha loja de roupas.',
        status: 'pending'
      }
    ]);

  console.log('Example contact requests created.');
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
