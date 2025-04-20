import { desc, eq } from 'drizzle-orm';
import { db } from './drizzle';
import { contactRequests, quoteRequests } from './schema';

// Get all contact requests
export async function getContactRequests() {
  return await db
    .select()
    .from(contactRequests)
    .orderBy(desc(contactRequests.createdAt));
}

// Get a single contact request by ID
export async function getContactRequestById(id: number) {
  const result = await db
    .select()
    .from(contactRequests)
    .where(eq(contactRequests.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

// Create a new contact request
export async function createContactRequest(data: {
  name: string;
  email: string;
  message: string;
}) {
  const [result] = await db
    .insert(contactRequests)
    .values({
      name: data.name,
      email: data.email,
      message: data.message,
    })
    .returning();

  return result;
}

// Update contact request status
export async function updateContactRequestStatus(id: number, status: string) {
  await db
    .update(contactRequests)
    .set({ status })
    .where(eq(contactRequests.id, id));
}

// ===== Quote Request Functions =====

// Get all quote requests
export async function getQuoteRequests() {
  return await db
    .select()
    .from(quoteRequests)
    .orderBy(desc(quoteRequests.createdAt));
}

// Get a single quote request by ID
export async function getQuoteRequestById(id: number) {
  const result = await db
    .select()
    .from(quoteRequests)
    .where(eq(quoteRequests.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

// Create a new quote request
export async function createQuoteRequest(data: {
  name: string;
  email: string;
  phone?: string;
  websiteType?: string;
  features?: string[];
  budget?: string;
  timeline?: string;
  message: string;
}) {
  const [result] = await db
    .insert(quoteRequests)
    .values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      websiteType: data.websiteType,
      features: data.features,
      budget: data.budget,
      timeline: data.timeline,
      message: data.message,
    })
    .returning();

  return result;
}

// Update quote request status
export async function updateQuoteRequestStatus(id: number, status: string) {
  await db
    .update(quoteRequests)
    .set({ status })
    .where(eq(quoteRequests.id, id));
}

// Update notification status
export async function updateQuoteNotificationStatus(id: number, notificationSent: string) {
  await db
    .update(quoteRequests)
    .set({ notificationSent })
    .where(eq(quoteRequests.id, id));
}
