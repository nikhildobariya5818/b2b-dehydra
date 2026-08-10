# Quick Start - PostgreSQL & One-Time Admin Setup

## 60-Second Setup

### 1. Start the Dev Server
```bash
npm run dev
```
Server runs on `http://localhost:3001`

### 2. Register First Admin Account (One-time)
Visit: `http://localhost:3001/admin/login`

You'll see:
```
No admin account exists yet. Create your admin account now.
[Create Admin Account]
```

Click the button and fill the registration form:
- **Full Name**: Your name
- **Email**: admin@example.com
- **Password**: At least 8 characters
- **Confirm**: Re-enter password

Click **Register**

### 3. Login to Dashboard
After registration, login with your credentials:
- Email: `admin@example.com`
- Password: (what you just created)

You're now in the admin dashboard!

## What You Can Do Now

### Products Management
- Add new products
- Edit existing products
- Upload product images
- Attach brochures
- Manage categories

### Client Requests
- View all client inquiries
- Update request status
- Add internal notes
- Track quotes and responses

### Locations (Google Maps)
- Add facility locations
- Manage coordinates
- Describe facilities

### Settings
- Upload brochures
- Manage files

## Database: PostgreSQL (Neon)

✓ Automatically configured with Neon  
✓ All data persists in PostgreSQL  
✓ No additional setup needed  

Connection verified:
- `DATABASE_URL` ✓ Set
- `PGHOST` ✓ Set
- `PGUSER` ✓ Set
- `PGPASSWORD` ✓ Set

## One-Time Admin - How It Works

**First Visit**: No admin exists → Registration is open  
**After Registration**: Admin exists → Registration is closed  
**Future Logins**: Only login page is available  

To reset (delete admin):
```sql
DELETE FROM "session" WHERE "userId" IN (SELECT id FROM "user");
DELETE FROM "account" WHERE "userId" IN (SELECT id FROM "user");
DELETE FROM "user";
```

## Public Website

### Visit Public Pages
- Homepage: `http://localhost:3001/`
- Products: `http://localhost:3001/products`
- Locations: `http://localhost:3001/locations`
- Contact: `http://localhost:3001/#contact`

### Client Actions
- Browse products (dynamic from database)
- Fill contact form
- Submit inquiries
- Download product brochures (if uploaded)

## Troubleshooting

### Issue: "Registration is closed"
✓ Admin already created  
→ Use login page to access dashboard

### Issue: "Invalid credentials"
✓ Wrong email/password  
→ Check spelling and capitalization

### Issue: Can't find `/api/admin/setup-status`
✓ Server not running  
→ Run `npm run dev` first

### Issue: Database connection error
✓ DATABASE_URL not set  
→ Check Neon integration in project settings

## Key Files

| File | Purpose |
|------|---------|
| `/app/admin/register/page.tsx` | One-time registration |
| `/app/admin/login/page.tsx` | Admin login |
| `/app/admin/(dashboard)/` | Protected admin pages |
| `/lib/db.ts` | PostgreSQL connection |
| `/lib/auth.ts` | Better Auth configuration |
| `/app/api/admin/setup-status/route.ts` | Setup check API |

## What's Different from Typical Setup

✓ **No manual DB creation** - PostgreSQL auto-configured  
✓ **No multi-registration** - Only first admin registers  
✓ **No registration page after setup** - Security feature  
✓ **Persistent data** - All data in Neon PostgreSQL  
✓ **Session-based** - HTTP-only cookies for security  

## Next: Deploy to Vercel

```bash
git add .
git commit -m "Add PostgreSQL & one-time admin setup"
git push origin main
```

Vercel will auto-deploy with:
- PostgreSQL connection ✓
- Admin setup system ✓
- All environment variables ✓

## Need Help?

See detailed docs:
- `ADMIN_SETUP.md` - Detailed setup guide
- `POSTGRESQL_SETUP_SUMMARY.md` - Full technical details
- `API_REFERENCE.md` - All API endpoints
- `README_TRANSFORMATION.md` - Project overview
