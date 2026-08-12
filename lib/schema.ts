import { pgTable, text, timestamp, boolean, serial, varchar, uuid, json, numeric } from "drizzle-orm/pg-core";

// ========== BETTER AUTH TABLES ==========
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// ========== APP TABLES ==========

// Products table
export const productsTable = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  specifications: json("specifications"),
  imageUrl: varchar("image_url", { length: 500 }),
  brochureUrl: varchar("brochure_url", { length: 500 }),
  videoUrl: varchar("video_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Facility locations table for Google Maps
export const facilitiesTable = pgTable("facilities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: varchar("address", { length: 500 }).notNull(),
  latitude: numeric("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: numeric("longitude", { precision: 11, scale: 8 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Client requests/inquiries table
export const clientRequestsTable = pgTable("client_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  industry: varchar("industry", { length: 100 }).notNull(),
  interestedProducts: text("interested_products").notNull(),
  estimatedVolume: varchar("estimated_volume", { length: 50 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Brochures table
export const brochuresTable = pgTable("brochures", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull(),
  fileUrl: varchar("file_url", { length: 500 }).notNull(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileSize: text("file_size"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
