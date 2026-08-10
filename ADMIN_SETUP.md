# Admin One-Time Setup Guide

This document explains the one-time admin registration system that secures your De'Hydra admin dashboard.

## Overview

The admin panel uses a **one-time setup** system:
- **First visit**: No admin account exists, so registration is required
- **After registration**: Registration is permanently closed, only login is allowed
- **Future access**: Only registered admin can access the dashboard

## Setup Flow

### Step 1: Access the Login Page
Visit `/admin/login` in your browser.

### Step 2: Create Admin Account
If no admin account exists, you'll see:
```
No admin account exists yet. Create your admin account now.
[Create Admin Account] button
```

Click the button to go to `/admin/register`.

### Step 3: Register Admin User
Fill in the registration form:
- **Full Name**: Your name (e.g., "John Doe")
- **Email Address**: Your admin email (e.g., "admin@dehydrafoods.com")
- **Password**: At least 8 characters (e.g., "SecurePass123!")
- **Confirm Password**: Re-enter your password

Click **Register** to create the account.

### Step 4: Login
After successful registration, you're automatically redirected to login.
Sign in with your email and password.

## Technical Details

### How It Works

**Setup Status API** (`GET /api/admin/setup-status`)
```json
{
  "setupComplete": false,
  "userCount": 0
}
```

The system checks if any users exist in the database:
- If users exist: Setup is complete, registration is closed
- If no users exist: Setup is needed, registration is open

### Pages

| Page | Public | Auth Required | Purpose |
|------|--------|---------------|---------|
| `/admin/login` | Yes | No | Login page (shows setup option if needed) |
| `/admin/register` | Yes | No | Registration page (only if no admin exists) |
| `/admin` | No | Yes | Dashboard (protected) |
| `/admin/products` | No | Yes | Product management |
| `/admin/requests` | No | Yes | Client requests |

### Database

Admin users are stored in the `user` table (Neon PostgreSQL):
```sql
SELECT * FROM "user" WHERE email = 'admin@dehydrafoods.com';
```

Session data is stored in the `session` table:
```sql
SELECT * FROM "session" WHERE "userId" = '<user-id>';
```

## Security Features

✓ **One-time registration**: Only the first admin can register  
✓ **Password hashing**: Passwords are hashed using Better Auth  
✓ **Session management**: Secure HTTP-only cookies  
✓ **Protected routes**: Admin pages require authentication  
✓ **Database integration**: User data stored in Neon PostgreSQL  

## Troubleshooting

### Issue: "Registration is closed" but I need to create an admin account

**Solution**: Your database already has an admin user. Try logging in with the credentials you used during registration. If you forgot the password, contact your database administrator to reset it.

### Issue: Getting "Invalid credentials" on login

**Possible causes**:
1. Email or password is incorrect
2. User account doesn't exist yet (try registering first)
3. Database connection issue

**Solution**: 
- Check your email and password are correct
- Ensure you've completed registration
- Check that `DATABASE_URL` environment variable is set correctly

### Issue: Can't access `/admin/register`

**Possible causes**:
1. Admin account already exists (registration is closed)
2. Setup check API is failing
3. Browser caching

**Solution**:
- Check setup status: Visit `/api/admin/setup-status`
- Clear browser cache
- Try in a new incognito/private window

## Environment Variables Required

- `DATABASE_URL`: Neon PostgreSQL connection string (auto-set)
- `BETTER_AUTH_SECRET`: Random 32+ character secret (must be set for production)

## Next Steps After Setup

1. **Log in** to the admin dashboard at `/admin`
2. **Create products** in the Products section
3. **Manage locations** for Google Maps
4. **View client requests** as they come in
5. **Upload brochures** for products

## Resetting Admin Account (Advanced)

To completely reset and allow new registration:

```sql
-- Delete all sessions first
DELETE FROM "session" WHERE "userId" IN (
  SELECT id FROM "user" WHERE role = 'admin'
);

-- Delete all accounts
DELETE FROM "account" WHERE "userId" IN (
  SELECT id FROM "user" WHERE role = 'admin'
);

-- Delete admin users
DELETE FROM "user" WHERE role = 'admin';
```

**⚠️ Warning**: This will log out all admins. Only do this in development or with proper authorization.

## Support

For issues or questions, refer to:
- Better Auth docs: https://www.better-auth.com
- Neon docs: https://neon.tech/docs
- This project's API_REFERENCE.md
