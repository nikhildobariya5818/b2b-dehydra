ALTER TABLE "client_requests" ADD COLUMN IF NOT EXISTS "request_type" varchar(30) DEFAULT 'general' NOT NULL;
ALTER TABLE "client_requests" ADD COLUMN IF NOT EXISTS "product_id" uuid;
ALTER TABLE "client_requests" ADD COLUMN IF NOT EXISTS "response_message" text;
ALTER TABLE "client_requests" ADD COLUMN IF NOT EXISTS "response_brochure_urls" text;
ALTER TABLE "client_requests" ADD COLUMN IF NOT EXISTS "responded_at" timestamp;
