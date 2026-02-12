# Stripe Setup Guide 💳

Complete step-by-step guide for setting up Stripe payment processing for conversationmine.com ecommerce platform.

## Table of Contents
1. [Create Stripe Account](#1-create-stripe-account)
2. [Create Products & Prices](#2-create-products--prices)
3. [Create Payment Links](#3-create-payment-links)
4. [Set Up Webhook](#4-set-up-webhook)
5. [Get API Keys](#5-get-api-keys)
6. [Configure Environment Variables](#6-configure-environment-variables)
7. [Test the Integration](#7-test-the-integration)
8. [Go Live](#8-go-live)

---

## 1. Create Stripe Account

### Sign Up
1. Go to https://stripe.com
2. Click **"Start now"** or **"Sign up"**
3. Enter email, create password
4. Verify email address

### Complete Business Profile
1. Go to **Settings** → **Business settings**
2. Fill in:
   - **Business name**: conversationmine.com
   - **Business type**: Individual / Sole Proprietorship
   - **Website**: https://conversationmine.com
   - **Product description**: "Digital books and platform access for consciousness technology"
   - **Customer support email**: support@conversationmine.com

### Activate Your Account
1. Complete identity verification
2. Add bank account for payouts
3. Enable payment methods (card, Apple Pay, Google Pay)

---

## 2. Create Products & Prices

You need to create **8 products** in Stripe:

### Product 1: Level 7 Consciousness Awakening
1. Go to **Products** → **Add product**
2. **Name**: Level 7 Consciousness Awakening
3. **Description**: The 168-hour journey from $0 to infinity. Vision Series Book 1.
4. **Pricing**: 
   - **Price**: $24.99 USD
   - **Billing**: One-time
5. **Metadata** (click "Add metadata"):
   - `product_id`: `price_book1`
   - `type`: `digital_book`
6. Click **Save product**
7. **Copy the Price ID** (starts with `price_...`) → You'll need this later

### Product 2: Bilateral Coupling - The New Science
- **Name**: Bilateral Coupling: The New Science
- **Description**: The pattern behind 50 patents. Vision Series Book 2.
- **Price**: $24.99 USD
- **Metadata**: `product_id` = `price_book2`, `type` = `digital_book`
- **Copy Price ID**

### Product 3: Multi-Instance Architecture
- **Name**: Multi-Instance Architecture
- **Description**: KIRO, RESONATE, META-VOICE, conversationmine. Vision Series Book 3.
- **Price**: $24.99 USD
- **Metadata**: `product_id` = `price_book3`, `type` = `digital_book`
- **Copy Price ID**

### Product 4: Vision Extraction Methodology
- **Name**: Vision Extraction Methodology
- **Description**: RESONATE framework for idea → patent. Vision Series Book 4.
- **Price**: $24.99 USD
- **Metadata**: `product_id` = `price_book4`, `type` = `digital_book`
- **Copy Price ID**

### Product 5: The 50 Patent Portfolio
- **Name**: The 50 Patent Portfolio
- **Description**: $1M-$20M valuation breakdown. Vision Series Book 5.
- **Price**: $24.99 USD
- **Metadata**: `product_id` = `price_book5`, `type` = `digital_book`
- **Copy Price ID**

### Product 6: Meta-Consciousness Framework
- **Name**: Meta-Consciousness Framework
- **Description**: 4-domain network architecture. Vision Series Book 6.
- **Price**: $24.99 USD
- **Metadata**: `product_id` = `price_book6`, `type` = `digital_book`
- **Copy Price ID**

### Product 7: Infrastructure Playbook
- **Name**: Infrastructure Playbook
- **Description**: 48-hour conversationmine build story. Vision Series Book 7.
- **Price**: $24.99 USD
- **Metadata**: `product_id` = `price_book7`, `type` = `digital_book`
- **Copy Price ID**

### Product 8: Complete Vision Series (Bundle)
- **Name**: Complete Vision Series - All 7 Books
- **Description**: Save $75! Get all 7 Vision Series books in one bundle.
- **Price**: $99.00 USD
- **Metadata**: `product_id` = `price_bundle`, `type` = `bundle`
- **Copy Price ID**

---

## 3. Create Payment Links

For each product, create a Payment Link:

### Steps for Each Product
1. Go to **Payment Links** → **Create payment link**
2. **Select product**: Choose the product you just created
3. **Success URL**: 
   ```
   https://conversationmine.com/success.html?session_id={CHECKOUT_SESSION_ID}&product={{PRODUCT_ID}}
   ```
   Replace `{{PRODUCT_ID}}` with:
   - Book 1: `price_book1`
   - Book 2: `price_book2`
   - Book 3: `price_book3`
   - Book 4: `price_book4`
   - Book 5: `price_book5`
   - Book 6: `price_book6`
   - Book 7: `price_book7`
   - Bundle: `price_bundle`
   
   **Example for Book 1**:
   ```
   https://conversationmine.com/success.html?session_id={CHECKOUT_SESSION_ID}&product=price_book1
   ```

4. **Optional settings**:
   - ✓ Collect customer billing address
   - ✓ Collect phone number
   - ✓ Allow promo codes

5. Click **Create link**
6. **Copy the Payment Link URL** (starts with `https://buy.stripe.com/...`)

### Payment Link Mapping
Update `library-access.html` with your Payment Links:

```javascript
const STRIPE_LINKS = {
  'price_book1': 'https://buy.stripe.com/YOUR_LINK_HERE_BOOK1',
  'price_book2': 'https://buy.stripe.com/YOUR_LINK_HERE_BOOK2',
  'price_book3': 'https://buy.stripe.com/YOUR_LINK_HERE_BOOK3',
  'price_book4': 'https://buy.stripe.com/YOUR_LINK_HERE_BOOK4',
  'price_book5': 'https://buy.stripe.com/YOUR_LINK_HERE_BOOK5',
  'price_book6': 'https://buy.stripe.com/YOUR_LINK_HERE_BOOK6',
  'price_book7': 'https://buy.stripe.com/YOUR_LINK_HERE_BOOK7',
  'price_bundle': 'https://buy.stripe.com/YOUR_LINK_HERE_BUNDLE'
};
```

---

## 4. Set Up Webhook

Webhooks allow Stripe to notify your server when payments complete.

### Create Webhook Endpoint

#### For Local Testing (Development)
1. Install Stripe CLI:
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. Login:
   ```bash
   stripe login
   ```

3. Forward webhook events to localhost:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```

4. **Copy the webhook signing secret** (starts with `whsec_...`)

#### For Production (Railway/Cloud)
1. Go to **Developers** → **Webhooks** → **Add endpoint**
2. **Endpoint URL**: 
   ```
   https://YOUR_DOMAIN.com/api/webhook/stripe
   ```
   Replace `YOUR_DOMAIN` with your actual domain (e.g., conversationmine.com or Railway URL)

3. **Events to send**: Select these events:
   - ✓ `checkout.session.completed`
   - ✓ `payment_intent.succeeded`
   - ✓ `payment_intent.payment_failed`

4. Click **Add endpoint**
5. **Copy the Signing secret** (starts with `whsec_...`)

---

## 5. Get API Keys

### Secret Key
1. Go to **Developers** → **API keys**
2. **For Testing**: Copy **Publishable key (test)** and **Secret key (test)**
3. **For Production**: Click **"Reveal live key"** → Copy **Secret key (live)**

### Keys You Need
- ✅ **Secret Key** (test): `sk_test_...`
- ✅ **Secret Key** (live): `sk_live_...`
- ✅ **Webhook Secret** (test): `whsec_...` (from Stripe CLI)
- ✅ **Webhook Secret** (live): `whsec_...` (from webhook endpoint)

---

## 6. Configure Environment Variables

### Local Development (.env file)
Create `.env` file in project root:

```bash
# Stripe Test Keys
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_TEST_WEBHOOK_SECRET_HERE

# Server
PORT=3000
```

**⚠️ Important**: Add `.env` to `.gitignore`:
```bash
echo ".env" >> .gitignore
```

### Production (Railway)
1. Go to Railway dashboard
2. Select your project
3. Go to **Variables** tab
4. Add:
   - `STRIPE_SECRET_KEY` = `sk_live_YOUR_LIVE_KEY_HERE`
   - `STRIPE_WEBHOOK_SECRET` = `whsec_YOUR_LIVE_WEBHOOK_SECRET_HERE`
   - `PORT` = `3000`

**Never commit API keys to git!**

---

## 7. Test the Integration

### Install Dependencies
```bash
npm install
```

### Start Server
```bash
# Terminal 1: Start server
npm start

# Terminal 2: Listen for webhooks (test mode only)
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

### Test Flow

#### 1. Test Payment Link
1. Go to http://localhost:3000/library-access.html
2. Click **"Buy Now"** on any book
3. Use Stripe test card:
   - **Card number**: `4242 4242 4242 4242`
   - **Expiry**: `12/34` (any future date)
   - **CVC**: `123` (any 3 digits)
   - **ZIP**: `12345`
4. Complete checkout

#### 2. Verify Success Page
- Should redirect to `success.html?session_id=...&product=price_book1`
- Should show correct book title, order ID, download button

#### 3. Check Webhook
- Check terminal logs for:
  ```
  ✓ Webhook received: checkout.session.completed
  ✓ Payment successful: cs_test_...
  Order created: { orderId: 'VS-...', email: 'test@example.com', ... }
  ```

#### 4. Test Download Page
- Click **"Download Your Book"** button
- Should go to `download.html?product=price_book1&order=VS-...&demo=false`
- Should show correct book title, download formats

#### 5. Test Order Lookup
- Go to http://localhost:3000/orders.html
- Enter test email address
- Should show demo orders (or real orders if connected to database)

### Test Checklist
- ✅ Payment link opens Stripe checkout
- ✅ Test payment completes successfully
- ✅ Redirects to success.html with correct product
- ✅ Webhook received and logged
- ✅ Download page shows correct book
- ✅ Order lookup works
- ✅ Email templates render correctly (open `email-templates/*.html` in browser)

---

## 8. Go Live

### Switch to Live Mode

#### 1. Request Live Access
1. Go to **Settings** → **Account settings**
2. Complete all required information
3. Submit for review (usually approved within 24 hours)

#### 2. Create Live Products
- Repeat steps 2-3 (Create Products & Payment Links) in **Live mode**
- Update `library-access.html` with **live** Payment Links

#### 3. Create Live Webhook
- Repeat step 4 using your production domain
- Update environment variables with **live** keys

#### 4. Update Environment Variables
```bash
# Production (Railway)
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET_HERE
```

#### 5. Test Live Mode
- Use a **real card** (will charge real money!)
- Or use Stripe test mode toggle to switch back

### Pre-Launch Checklist
- ✅ All 8 products created (7 books + bundle)
- ✅ All 8 Payment Links created with correct success URLs
- ✅ Webhook endpoint configured with live domain
- ✅ Live API keys added to production environment
- ✅ `.env` file in `.gitignore`
- ✅ Payment flow tested in test mode
- ✅ Email templates ready (order confirmation, download access, bundle welcome)
- ✅ All pages work (library-access, success, download, orders)

---

## Troubleshooting

### Webhook Not Firing
**Problem**: No webhook events received after payment

**Solutions**:
1. Check webhook endpoint URL is correct
2. Verify Stripe CLI is running (`stripe listen`)
3. Check server logs for errors
4. Verify webhook secret is correct
5. Test webhook manually: **Developers** → **Webhooks** → **Send test webhook**

### Payment Succeeds But No Redirect
**Problem**: After payment, stays on Stripe page

**Solutions**:
1. Check success URL in Payment Link settings
2. Verify `{CHECKOUT_SESSION_ID}` placeholder is included
3. Check success.html URL params handling

### "No such price" Error
**Problem**: Error when creating Payment Link

**Solutions**:
1. Ensure product was saved first
2. Copy correct Price ID (not Product ID)
3. Check you're in the same mode (test vs live)

### Orders Not Saving
**Problem**: Orders appear in webhook logs but not queryable

**Solutions**:
1. Check `handleSuccessfulPayment()` function in server.js
2. Implement database storage (TODO in current version)
3. For now, orders only logged to console

---

## Next Steps

### Recommended Enhancements
1. **Database Integration**: Store orders in PostgreSQL/MongoDB
2. **Email Service**: Integrate SendGrid/Mailgun for automated emails
3. **PDF Generation**: Convert TXT books to PDF/EPUB
4. **Download Security**: Add token-based download links with expiration
5. **Analytics**: Track conversion rates in Stripe Dashboard
6. **Refund Automation**: Auto-refund policy (7-day window)

### Support Resources
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Webhook Testing](https://stripe.com/docs/webhooks/test)
- [Payment Links Guide](https://stripe.com/docs/payment-links)

---

## Questions?

🔗 **Stripe Support**: https://support.stripe.com  
📧 **conversationmine.com**: support@conversationmine.com

---

**Last Updated**: February 11, 2026  
**Version**: 1.0  
**Status**: ✅ Ready for Production
