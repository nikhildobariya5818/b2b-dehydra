"use server";

import { db } from "./db";
import { productsTable, clientRequestsTable, brochuresTable, facilitiesTable } from "./schema";
import { eq } from "drizzle-orm";

// ========== PRODUCTS ==========

export async function getAllProducts() {
  try {
    return await db.select().from(productsTable).orderBy(productsTable.createdAt);
  } catch (error) {
    console.error("[DB] Error fetching products:", error);
    throw error;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.slug, slug))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Error fetching product:", error);
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    const result = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Error fetching product:", error);
    throw error;
  }
}

export async function createProduct(data: {
  name: string;
  slug: string;
  category: string;
  description: string;
  specifications?: any;
  imageUrl?: string;
  brochureUrl?: string;
}) {
  try {
    const result = await db.insert(productsTable).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("[DB] Error creating product:", error);
    throw error;
  }
}

export async function updateProduct(
  id: string,
  data: Partial<{
    name: string;
    slug: string;
    category: string;
    description: string;
    specifications?: any;
    imageUrl?: string;
    brochureUrl?: string;
  }>
) {
  try {
    const result = await db
      .update(productsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(productsTable.id, id))
      .returning();
    return result[0];
  } catch (error) {
    console.error("[DB] Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.delete(productsTable).where(eq(productsTable.id, id));
  } catch (error) {
    console.error("[DB] Error deleting product:", error);
    throw error;
  }
}

// ========== CLIENT REQUESTS ==========

export async function createClientRequest(data: {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  industry: string;
  interestedProducts: string;
  estimatedVolume?: string;
  message: string;
}) {
  try {
    const result = await db.insert(clientRequestsTable).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("[DB] Error creating client request:", error);
    throw error;
  }
}

export async function getAllClientRequests() {
  try {
    return await db.select().from(clientRequestsTable).orderBy(clientRequestsTable.createdAt);
  } catch (error) {
    console.error("[DB] Error fetching client requests:", error);
    throw error;
  }
}

export async function getClientRequestById(id: string) {
  try {
    const result = await db
      .select()
      .from(clientRequestsTable)
      .where(eq(clientRequestsTable.id, id))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Error fetching client request:", error);
    throw error;
  }
}

export async function updateClientRequest(
  id: string,
  data: Partial<{
    status: string;
    notes: string;
  }>
) {
  try {
    const result = await db
      .update(clientRequestsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(clientRequestsTable.id, id))
      .returning();
    return result[0];
  } catch (error) {
    console.error("[DB] Error updating client request:", error);
    throw error;
  }
}

// ========== BROCHURES ==========

export async function createBrochure(data: {
  productId: string;
  fileUrl: string;
  fileName: string;
  fileSize?: string;
}) {
  try {
    const result = await db.insert(brochuresTable).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("[DB] Error creating brochure:", error);
    throw error;
  }
}

export async function getBrochuresByProductId(productId: string) {
  try {
    return await db
      .select()
      .from(brochuresTable)
      .where(eq(brochuresTable.productId, productId));
  } catch (error) {
    console.error("[DB] Error fetching brochures:", error);
    throw error;
  }
}

export async function deleteBrochure(id: string) {
  try {
    await db.delete(brochuresTable).where(eq(brochuresTable.id, id));
  } catch (error) {
    console.error("[DB] Error deleting brochure:", error);
    throw error;
  }
}

// ========== FACILITIES (Google Maps) ==========

export async function getAllFacilities() {
  try {
    return await db.select().from(facilitiesTable).orderBy(facilitiesTable.createdAt);
  } catch (error) {
    console.error("[DB] Error fetching facilities:", error);
    throw error;
  }
}

export async function getFacilityById(id: string) {
  try {
    const result = await db
      .select()
      .from(facilitiesTable)
      .where(eq(facilitiesTable.id, id))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[DB] Error fetching facility:", error);
    throw error;
  }
}

export async function createFacility(data: {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  description?: string;
  type?: string;
}) {
  try {
    const result = await db
      .insert(facilitiesTable)
      .values({
        name: data.name,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        description: data.description,
        type: data.type,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error("[DB] Error creating facility:", error);
    throw error;
  }
}

export async function updateFacility(
  id: string,
  data: {
    name?: string;
    address?: string;
    latitude?: string;
    longitude?: string;
    description?: string;
    type?: string;
  }
) {
  try {
    const result = await db
      .update(facilitiesTable)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(facilitiesTable.id, id))
      .returning();
    return result[0];
  } catch (error) {
    console.error("[DB] Error updating facility:", error);
    throw error;
  }
}

export async function deleteFacility(id: string) {
  try {
    await db.delete(facilitiesTable).where(eq(facilitiesTable.id, id));
  } catch (error) {
    console.error("[DB] Error deleting facility:", error);
    throw error;
  }
}
