# 🔧 TASKS FOR YOU - Manual Steps Required

**Last Updated:** April 3, 2026  
**Your Action Required:** These tasks need manual intervention or external setup

---

## 🚨 CRITICAL - DO THESE FIRST

### 1. Install NPM Dependencies (Required before running)

**Backend:**
```bash
cd apps/backend

# For real-time messaging (WebSocket)
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io

# For scheduled jobs (notifications, cleanup)
npm install @nestjs/schedule

# For payment gateway (choose ONE based on your region)
npm install stripe           # Recommended for international
# OR
npm install razorpay         # Recommended for India

# For file uploads (if not already installed)
npm install multer @types/multer

# For PDF generation (receipts)
npm install pdfkit @types/pdfkit
```

**Frontend:**
```bash
cd apps/frontend

# For real-time messaging
npm install socket.io-client

# For date formatting
npm install date-fns

# For charts (analytics)
npm install recharts

# For payment forms (choose based on your payment gateway)
npm install @stripe/stripe-js @stripe/react-stripe-js  # For Stripe
# OR
npm install react-razorpay                              # For Razorpay

# For animations
npm install framer-motion

# For multi-language (i18n)
npm install next-i18next react-i18next
```

---

## 💳 Payment Gateway Setup (REQUIRED for Bookings)

### Option 1: Stripe (International)
1. **Create Stripe Account:**
   - Go to https://stripe.com
   - Sign up for a free account
   - Complete business verification

2. **Get API Keys:**
   - Navigate to Developers → API Keys
   - Copy your **Publishable Key** (starts with `pk_`)
   - Copy your **Secret Key** (starts with `sk_`)

3. **Add to Environment Variables:**
   ```bash
   # apps/backend/.env
   STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
   STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx  # From webhooks section
   
   # apps/frontend/.env.local
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
   ```

4. **Setup Webhook (for payment confirmations):**
   - Go to Developers → Webhooks
   - Add endpoint: `https://your-domain.com/api/payments/webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.failed`
   - Copy webhook signing secret

### Option 2: Razorpay (India)
1. **Create Razorpay Account:**
   - Go to https://razorpay.com
   - Sign up and complete KYC

2. **Get API Keys:**
   - Go to Settings → API Keys
   - Generate Test/Live keys

3. **Add to Environment Variables:**
   ```bash
   # apps/backend/.env
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
   
   # apps/frontend/.env.local
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   ```

---

## 🔥 Firebase Setup (REQUIRED for Push Notifications)

1. **Create Firebase Project:**
   - Go to https://console.firebase.google.com
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Cloud Messaging:**
   - In Firebase Console → Project Settings
   - Go to "Cloud Messaging" tab
   - Copy your **Server Key**

3. **Get Service Account:**
   - Project Settings → Service Accounts
   - Click "Generate new private key"
   - Download JSON file
   - Save as `firebase-admin-key.json` in `apps/backend/` (DO NOT COMMIT)

4. **Add to Environment Variables:**
   ```bash
   # apps/backend/.env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   
   # apps/frontend/.env.local
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXX
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:xxxxxxxxxxxxx
   NEXT_PUBLIC_FIREBASE_VAPID_KEY=BCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

---

## 💾 Database Migrations (REQUIRED before testing)

Run these commands to create database tables:

```bash
cd apps/backend

# Generate migration for messaging tables
npm run migration:generate -- -n AddMessagingTables

# Generate migration for bookings/payments
npm run migration:generate -- -n AddBookingAndPaymentTables

# Generate migration for premium listings
npm run migration:generate -- -n AddPremiumListingsTables

# Generate migration for offers
npm run migration:generate -- -n AddOffersTables

# Generate migration for user activities (recommendations)
npm run migration:generate -- -n AddUserActivityTables

# Generate migration for device tokens (push notifications)
npm run migration:generate -- -n AddDeviceTokensTables

# Run ALL migrations
npm run migration:run
```

**⚠️ IMPORTANT:** Always backup your database before running migrations!

---

## 🧪 Testing Setup

### 1. Payment Gateway Testing
- **Stripe Test Cards:**
  - Success: `4242 4242 4242 4242`
  - Decline: `4000 0000 0000 0002`
  - 3D Secure: `4000 0025 0000 3155`

- **Razorpay Test Cards:**
  - Success: Any card with valid expiry and CVV
  - Razorpay provides a test mode

### 2. API Testing (Postman/Insomnia)
1. Import API collection (I'll create this)
2. Set environment variables:
   - `BASE_URL`: http://localhost:3001
   - `JWT_TOKEN`: (get from login endpoint)
3. Test all endpoints systematically

---

## 🌐 Domain & SSL (OPTIONAL - for production)

### If deploying to production:

1. **Purchase Domain:**
   - Namecheap, GoDaddy, or Google Domains
   - Point DNS to your server IP

2. **Get SSL Certificate:**
   ```bash
   # Using Let's Encrypt (free)
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

3. **Update Environment Variables:**
   ```bash
   # Production URLs
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

---

## 📧 Email Service Setup (OPTIONAL - enhances user experience)

### Option 1: SendGrid
1. Sign up at https://sendgrid.com
2. Create API key
3. Add to `.env`:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxx
   EMAIL_FROM=noreply@yourdomain.com
   ```

### Option 2: AWS SES
1. Sign up for AWS
2. Verify domain/email
3. Get credentials
4. Add to `.env`:
   ```
   AWS_SES_REGION=us-east-1
   AWS_SES_ACCESS_KEY=AKIAxxxxxxxxxxxxxx
   AWS_SES_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
   ```

---

## 🗂️ File Storage Setup (OPTIONAL - for media uploads)

### Option 1: AWS S3
1. Create S3 bucket
2. Create IAM user with S3 permissions
3. Add to `.env`:
   ```
   AWS_S3_BUCKET=rentro-uploads
   AWS_S3_REGION=us-east-1
   AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxxxx
   AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Option 2: Cloudinary
1. Sign up at https://cloudinary.com
2. Get credentials from dashboard
3. Add to `.env`:
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
   ```

---

## 🚀 Deployment Steps (When ready for production)

### 1. Build Applications
```bash
# Backend
cd apps/backend
npm run build

# Frontend
cd apps/frontend
npm run build
```

### 2. Setup PostgreSQL (Production)
- Use managed service: AWS RDS, DigitalOcean, or Heroku Postgres
- Update `DATABASE_URL` in production `.env`

### 3. Setup Redis (Production)
- Use managed service: Redis Cloud, AWS ElastiCache
- Update `REDIS_URL` in production `.env`

### 4. Deploy
Choose one:
- **Vercel** (Frontend) + **Railway/Render** (Backend) - Easiest
- **AWS EC2** - Most control
- **Docker + Kubernetes** - Most scalable
- **Heroku** - Quickest

---

## ✅ VERIFICATION CHECKLIST

Before considering Phase 6 complete, verify:

### Messaging System:
- [ ] Send and receive messages in real-time
- [ ] Unread count updates correctly
- [ ] WebSocket reconnects after disconnect
- [ ] Messages persist in database
- [ ] Block/unblock works correctly

### Booking & Payment:
- [ ] Can create a booking
- [ ] Payment gateway redirects properly
- [ ] Payment webhook receives confirmations
- [ ] Booking status updates after payment
- [ ] Receipt generation works
- [ ] Refund process works (test mode)

### Premium Listings:
- [ ] Can purchase premium plan
- [ ] Premium listings appear in search results first
- [ ] Featured badge shows on listing cards
- [ ] Premium expiry works correctly

### General:
- [ ] All database migrations run successfully
- [ ] No console errors in browser
- [ ] No server crashes
- [ ] API responds within 200ms for most requests
- [ ] Mobile responsive on all new pages

---

## 📞 NEED HELP?

### Common Issues:

**"Cannot find module '@nestjs/websockets'"**
→ Run: `npm install @nestjs/websockets @nestjs/platform-socket.io socket.io`

**"Migration failed: table already exists"**
→ Check database schema, drop tables if needed, rerun migration

**"Payment webhook not receiving events"**
→ Ensure webhook URL is publicly accessible (use ngrok for local testing)

**"WebSocket connection failed"**
→ Check CORS settings in backend, ensure Socket.io initialized correctly

**"Firebase not initialized"**
→ Verify all Firebase credentials in .env file

---

## 🎯 SUMMARY OF YOUR TASKS

1. ✅ Install all NPM dependencies (both backend & frontend)
2. ✅ Choose and setup payment gateway (Stripe OR Razorpay)
3. ✅ Setup Firebase for push notifications
4. ✅ Run database migrations
5. ⚠️ (Optional) Setup email service
6. ⚠️ (Optional) Setup file storage
7. ⚠️ (Optional) Setup domain & SSL for production
8. ✅ Test all features using the verification checklist

**Estimated Time:** 2-3 hours for core setup (steps 1-4)

---

**Everything else (code implementation) is being done automatically!** 🤖

I'm implementing:
- ✅ All backend code (entities, services, controllers, gateways)
- ✅ All frontend code (pages, components, hooks, services)
- ✅ WebSocket real-time features
- ✅ Payment integration code
- ✅ Premium listing logic
- ✅ Recommendation algorithms
- ✅ Analytics dashboards
- ✅ All other Phase 6 features

**Your job:** Setup external services & test the implementation!


---

Last updated: April 3, 2026, 18:10 UTC
