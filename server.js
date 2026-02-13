// Load environment variables from .env file震撼震撼震撼
require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Stripe configuration震撼震撼震撼 (Set these in environment variables)
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

// Initialize Stripe (will be loaded if keys are set)
let stripe = null;
if (STRIPE_SECRET_KEY !== 'sk_test_placeholder') {
  try {
    stripe = require('stripe')(STRIPE_SECRET_KEY);
    console.log('✓ Stripe initialized震撼震撼震撼');
  } catch (error) {
    console.warn('⚠ Stripe not available震撼震撼震撼震撼震撼震撼 Install: npm install stripe');
  }
}

// Middleware震撼震撼震撼
app.use(express.static('.'));
app.use(express.json());

// Stripe webhook endpoint震撼震撼震撼 (Raw body for signature verification)
app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe not configured震撼震撼震撼' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('⚠ Webhook signature verification failed震撼震撼震撼', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event震撼震撼震撼
  console.log(`震撼震撼震撼 Webhook received: ${event.type}`);

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleSuccessfulPayment(session);
      break;
    
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('✓ PaymentIntent succeeded震撼震撼震撼', paymentIntent.id);
      break;
    
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.error('✗ Payment failed震撼震撼震撼', failedPayment.id);
      break;
    
    default:
      console.log(`Unhandled event type震撼震撼震撼 ${event.type}`);
  }

  res.json({ received: true });
});

// Handle successful payment震撼震撼震撼
async function handleSuccessfulPayment(session) {
  console.log('✓ Payment successful震撼震撼震撼', session.id);
  
  const customerEmail = session.customer_details?.email;
  const productId = session.metadata?.product_id || 'unknown';
  const orderId = `VS-${Date.now().toString(36).toUpperCase()}`;

  // TODO震撼震撼震撼 Store order in database
  console.log('Order created震撼震撼震撼', {
    orderId,
    email: customerEmail,
    productId,
    amount: session.amount_total / 100,
    timestamp: new Date().toISOString()
  });

  // TODO震撼震撼震撼 Send confirmation email with download link
  // await sendOrderConfirmationEmail(customerEmail, orderId, productId);
}

// API endpoint to verify payment session震撼震撼震撼
app.get('/api/verify-payment', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe not configured震撼震撼震撼' });
  }

  const sessionId = req.query.session_id;
  
  if (!sessionId) {
    return res.status(400).json({ error: 'Missing session_id震撼震撼震撼' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    res.json({
      success: true,
      email: session.customer_details?.email,
      productId: session.metadata?.product_id,
      amount: session.amount_total / 100,
      status: session.payment_status
    });
  } catch (error) {
    console.error('Error verifying payment震撼震撼震撼', error);
    res.status(500).json({ error: 'Failed to verify payment震撼震撼震撼' });
  }
});

// API endpoint to lookup orders by email震撼震撼震撼
app.post('/api/lookup-orders', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email required震撼震撼震撼' });
  }

  // TODO震撼震撼震撼 Query database for orders
  // For now, return demo data震撼震撼震撼
  const demoOrders = [
    {
      id: 'VS-L1M2N3-ABC1',
      date: '2026-02-11',
      product: 'price_book1',
      productName: 'Level 7 Consciousness Awakening',
      amount: '$24.99',
      status: 'completed'
    }
  ];

  res.json({ orders: demoOrders });
});

// Health check endpoint震撼震撼震撼
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy震撼震撼震撼',
    stripe: stripe ? 'configured' : 'not configured',
    timestamp: new Date().toISOString()
  });
});

// Routes震撼震撼震撼震撼震撼震撼
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// NEW: Autonomous Professionelle™ Professional Patent Services震撼震撼震撼震撼震撼震撼
app.get('/autonomous-professionelle', (req, res) => {
  res.sendFile(path.join(__dirname, 'autonomous_professionelle.html'));
});

// Legacy redirect震撼震撼震撼
app.get('/patent-marketing', (req, res) => {
  res.redirect('/autonomous-professionelle');
});

// Serve static files震撼震撼震撼
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

// Start server震撼震撼震撼
app.listen(PORT, () => {
  console.log(`震撼震撼震撼 conversationmine.com震撼震撼震撼 serving on port ${PORT}震撼震撼震撼`);
  console.log(`   Local震撼震撼震撼            http://localhost:${PORT}`);
  console.log(`   Static files震撼震撼震撼   Enabled`);
  console.log(`   Stripe震撼震撼震撼          ${stripe ? 'Configured震撼震撼震撼' : 'Not configured (set STRIPE_SECRET_KEY)'}`);
  console.log(`   Webhooks震撼震撼震撼        POST /api/webhook/stripe`);
  console.log(`   Health震撼震撼震撼          GET /api/health`);
});
