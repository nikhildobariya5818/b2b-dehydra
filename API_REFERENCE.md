# De'Hydra B2B Platform - API Reference

## Base URL

```
Development:  http://localhost:3001
Production:   https://yourdomain.com
```

All endpoints return JSON. Dates are returned in ISO 8601 format.

---

## Authentication

Admin endpoints require valid Better Auth session. Sessions are managed via HTTP-only cookies.

### Login
```
POST /api/auth/sign-in
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}

Response: 200 OK
Set-Cookie: better-auth.session_token=...
```

---

## Products Endpoints

### List All Products

```
GET /api/products

Response: 200 OK
[
  {
    "id": "uuid",
    "name": "Potato Flakes",
    "slug": "potato-flakes",
    "category": "Dehydrated",
    "description": "Premium dehydrated potato flakes...",
    "specifications": { "moisture": "≤7%", "shelf_life": "12 months" },
    "imageUrl": "https://blob.vercel-storage.com/...",
    "brochureUrl": "https://blob.vercel-storage.com/...",
    "createdAt": "2026-08-04T10:30:00Z",
    "updatedAt": "2026-08-04T10:30:00Z"
  }
]
```

### Get Product by ID

```
GET /api/products/[id]

Response: 200 OK
{
  "id": "uuid",
  "name": "Potato Flakes",
  "slug": "potato-flakes",
  ...
}

Response: 404 Not Found
{ "error": "Product not found" }
```

### Create Product (Admin Only)

```
POST /api/products
Authorization: Required (Better Auth session)
Content-Type: application/json

{
  "name": "Fried Onion",
  "slug": "fried-onion",
  "category": "Fried",
  "description": "Crispy fried onion pieces...",
  "specifications": { "cut_size": "5mm", "color": "Golden" },
  "imageUrl": "https://blob.vercel-storage.com/...",
  "brochureUrl": "https://blob.vercel-storage.com/..."
}

Response: 201 Created
{
  "id": "new-uuid",
  "name": "Fried Onion",
  ...
}
```

### Update Product (Admin Only)

```
PATCH /api/products/[id]
Authorization: Required
Content-Type: application/json

{
  "description": "Updated description...",
  "category": "Ready-to-use"
}

Response: 200 OK
{
  "id": "id",
  "name": "Fried Onion",
  "description": "Updated description...",
  ...
}
```

### Delete Product (Admin Only)

```
DELETE /api/products/[id]
Authorization: Required

Response: 200 OK
{ "success": true }

Response: 404 Not Found
{ "error": "Product not found" }
```

---

## Client Requests Endpoints

### List All Requests (Admin Only)

```
GET /api/client-requests
Authorization: Required

Response: 200 OK
[
  {
    "id": "uuid",
    "contactName": "John Smith",
    "companyName": "ABC Foods Inc",
    "email": "john@abcfoods.com",
    "phone": "+1-555-0123",
    "industry": "Food manufacturing",
    "estimatedVolume": "20-50 MT",
    "interestedProducts": "Potato Flakes",
    "message": "Looking for bulk supply of...",
    "status": "new",
    "notes": null,
    "createdAt": "2026-08-04T10:30:00Z",
    "updatedAt": "2026-08-04T10:30:00Z"
  }
]
```

### Get Request Details (Admin Only)

```
GET /api/client-requests/[id]
Authorization: Required

Response: 200 OK
{
  "id": "uuid",
  "contactName": "John Smith",
  "companyName": "ABC Foods Inc",
  ...
}

Response: 404 Not Found
{ "error": "Request not found" }
```

### Submit New Client Request (Public)

```
POST /api/client-requests
Content-Type: application/json

{
  "contactName": "John Smith",
  "companyName": "ABC Foods Inc",
  "email": "john@abcfoods.com",
  "phone": "+1-555-0123",
  "industry": "Food manufacturing",
  "estimatedVolume": "20-50 MT",
  "interestedProducts": "Potato Flakes",
  "message": "We are looking for bulk supply..."
}

Response: 201 Created
{
  "id": "new-uuid",
  "contactName": "John Smith",
  "status": "new",
  ...
}

Response: 400 Bad Request
{ "error": "Validation failed", "details": {...} }
```

### Update Request Status (Admin Only)

```
PATCH /api/client-requests/[id]
Authorization: Required
Content-Type: application/json

{
  "status": "reviewing",
  "notes": "Contacted client for more details"
}

Response: 200 OK
{
  "id": "id",
  "status": "reviewing",
  "notes": "Contacted client for more details",
  ...
}

// Status values: "new" | "reviewing" | "responded" | "quoted"
```

---

## Facilities Endpoints

### List All Facilities

```
GET /api/facilities

Response: 200 OK
[
  {
    "id": "uuid",
    "name": "Main Manufacturing Plant",
    "address": "123 Industrial Ave, City, Country",
    "latitude": "40.7128",
    "longitude": "-74.0060",
    "description": "Our primary production facility...",
    "type": "manufacturing",
    "createdAt": "2026-08-04T10:30:00Z",
    "updatedAt": "2026-08-04T10:30:00Z"
  }
]
```

### Get Facility by ID

```
GET /api/facilities/[id]

Response: 200 OK
{
  "id": "uuid",
  "name": "Main Manufacturing Plant",
  ...
}
```

### Create Facility (Admin Only)

```
POST /api/facilities
Authorization: Required
Content-Type: application/json

{
  "name": "Distribution Center",
  "address": "456 Logistics Blvd, City, Country",
  "latitude": "40.7580",
  "longitude": "-73.9855",
  "description": "Regional distribution hub",
  "type": "warehouse"
}

Response: 201 Created
{
  "id": "new-uuid",
  "name": "Distribution Center",
  ...
}
```

### Update Facility (Admin Only)

```
PUT /api/facilities/[id]
Authorization: Required
Content-Type: application/json

{
  "description": "Updated facility description",
  "type": "office"
}

Response: 200 OK
{
  "id": "id",
  "description": "Updated facility description",
  ...
}
```

### Delete Facility (Admin Only)

```
DELETE /api/facilities/[id]
Authorization: Required

Response: 200 OK
{ "success": true }
```

---

## Brochures Endpoints

### List All Brochures

```
GET /api/brochures

Response: 200 OK
[
  {
    "pathname": "brochures/potato-flakes.pdf",
    "contentType": "application/pdf",
    "size": 2048576,
    "url": "https://blob.vercel-storage.com/..."
  }
]
```

### Upload Brochure (Admin Only)

```
POST /api/brochures
Authorization: Required
Content-Type: multipart/form-data

file: [PDF file]
productId: "uuid" (optional)

Response: 201 Created
{
  "pathname": "brochures/new-brochure.pdf",
  "url": "https://blob.vercel-storage.com/..."
}
```

### Delete Brochure (Admin Only)

```
DELETE /api/brochures/[pathname]
Authorization: Required

Response: 200 OK
{ "success": true }
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message",
  "status": 400,
  "details": {} // Optional: detailed error information
}
```

### Common Error Codes

| Status | Error | Reason |
|--------|-------|--------|
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- 100 requests per minute for authenticated endpoints
- 10 requests per minute for public endpoints

---

## Webhooks (Future)

Planned webhook events:
- `client.request.created` - New client inquiry
- `product.updated` - Product information changed
- `facility.added` - New facility location added

---

## SDK/Client Examples

### JavaScript/TypeScript

```typescript
// Fetch all products
const products = await fetch('/api/products').then(r => r.json());

// Submit client request
const response = await fetch('/api/client-requests', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contactName: 'John',
    companyName: 'ABC Inc',
    email: 'john@abc.com',
    industry: 'Manufacturing',
    message: 'Interested in...'
  })
});

// Admin: Update request status
const updated = await fetch('/api/client-requests/id', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'reviewing',
    notes: 'Following up'
  })
});
```

### cURL

```bash
# List products
curl https://yourdomain.com/api/products

# Submit request
curl -X POST https://yourdomain.com/api/client-requests \
  -H "Content-Type: application/json" \
  -d '{
    "contactName": "John",
    "companyName": "ABC Inc",
    "email": "john@abc.com",
    "industry": "Manufacturing",
    "message": "Interested in..."
  }'
```

---

## Changelog

### v1.0.0 (Initial Release)
- [x] Products API
- [x] Client Requests API
- [x] Facilities API
- [x] Brochures API
- [x] Authentication

### Planned for v1.1.0
- [ ] Webhook events
- [ ] Rate limiting
- [ ] GraphQL endpoint
- [ ] Batch operations

---

## Support

For API issues, check:
1. Request format and headers
2. Authentication status
3. Error response message
4. Application logs in Vercel dashboard
5. Database connectivity

---

**Last Updated**: August 4, 2026  
**Version**: 1.0.0
