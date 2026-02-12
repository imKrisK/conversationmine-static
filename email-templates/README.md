# Email Templates

Email templates for conversationmine.com ecommerce platform.

## Templates

### 1. order-confirmation.html
**Trigger**: Stripe webhook `checkout.session.completed`  
**Sent to**: Customer email from Stripe session  
**Purpose**: Confirm order + provide download link  
**Variables**:
- `{{CUSTOMER_NAME}}` - Customer name or "Vision Seeker"
- `{{ORDER_ID}}` - Generated order ID (e.g., VS-L1M2N3-ABC1)
- `{{PRODUCT_NAME}}` - Book title or "Complete Vision Series"
- `{{AMOUNT}}` - Payment amount (e.g., $24.99)
- `{{DOWNLOAD_LINK}}` - Secure download link (expires in 30 days)
- `{{ORDER_DATE}}` - Purchase date

### 2. download-access.html
**Trigger**: User requests re-download via orders.html  
**Sent to**: User-provided email (verified against order database)  
**Purpose**: Email verification + re-download access  
**Variables**:
- `{{CUSTOMER_EMAIL}}` - Customer email address
- `{{VERIFICATION_LINK}}` - One-time verification link (expires in 24 hours)
- `{{ORDER_COUNT}}` - Number of orders found

### 3. welcome-bundle.html
**Trigger**: Bundle purchase detected in webhook  
**Sent to**: Customer email from Stripe session  
**Purpose**: Welcome + all 7 book links + reading order suggestion  
**Variables**:
- `{{CUSTOMER_NAME}}` - Customer name
- `{{ORDER_ID}}` - Bundle order ID
- `{{DOWNLOAD_LINKS}}` - Array of 7 book download links
- `{{ZIP_LINK}}` - All books ZIP download

## Email Service Integration

### Current: Demo Mode
Emails are logged to console only.

### Production: SendGrid/Mailgun
Update `server.js` with:
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendOrderConfirmation(order) {
  const html = fs.readFileSync('./email-templates/order-confirmation.html', 'utf8')
    .replace(/{{ORDER_ID}}/g, order.id)
    .replace(/{{PRODUCT_NAME}}/g, order.productName)
    // ... more replacements
  
  await sgMail.send({
    to: order.email,
    from: 'orders@conversationmine.com',
    subject: `Your Order ${order.id} is Ready ✨`,
    html: html
  });
}
```

## Testing

### Local Testing
Use [Mailtrap](https://mailtrap.io/) or similar for email testing without sending real emails.

### Template Preview
Open templates directly in browser to preview design.

## Style Guide

- **Design**: Level 7 holographic aesthetic (void-deep background, crystal-cyan accents)
- **Tone**: Professional but visionary ("Vision Seeker", "Consciousness Journey")
- **CTA Buttons**: Large, prominent download buttons
- **Footer**: Simple (Unsubscribe, Support, conversationmine.com)
