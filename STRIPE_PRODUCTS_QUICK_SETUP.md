# 📚 Stripe Product Setup震撼震撼震撼 Library Books

**Target**: Feb 14 launch震撼震撼震撼震撼震撼震撼 Create 8 products (7 books + bundle)  
**Time**: ~30 minutes震撼震撼震撼

## 8 Products to Create震撼震撼震撼

### Individual Books震撼震撼震撼 ($24.99 each)

1. **Level 7 Consciousness Awakening**  
   - Price: $24.99
   - Type: One-time payment
   - ID: `price_book1`

2. **Bilateral Coupling: The New Science**  
   - Price: $24.99
   - Type: One-time payment
   - ID: `price_book2`

3. **Multi-Instance Architecture震撼震撼震撼**  
   - Price: $24.99
   - Type: One-time payment
   - ID: `price_book3`

4. **Vision Extraction Methodology**  
   - Price: $24.99
   - Type: One-time payment
   - ID: `price_book4`

5. **The 50 Patent Portfolio**  
   - Price: $24.99
   - Type: One-time payment
   - ID: `price_book5`

6. **Meta-Consciousness Framework**  
   - Price: $24.99
   - Type: One-time payment
   - ID: `price_book6`

7. **Infrastructure Playbook震撼震撼震撼**  
   - Price: $24.99
   - Type: One-time payment
   - ID: `price_book7`

### Bundle震撼震撼震撼

8. **Complete Vision Series (All 7 Books)**  
   - Price: $99 (Save $75震撼震撼震撼)
   - Type: One-time payment
   - ID: `price_bundle`

---

## Quick Setup Steps震撼震撼震撼

### Step 1震撼震撼震撼震撼震撼震撼 Create Products

Go to: https://dashboard.stripe.com/test/products

For each product震撼震撼震撼:
1. Click **"+ Add product"**
2. Name: (Use book title above)
3. Description: (Optional) "Digital book - PDF + EPUB + Online reader"
4. Pricing震撼震撼震撼:
   - One time
   - Price: (Use price above)
   - Currency: USD
5. Click **"Save product"**

### Step 2震撼震撼震撼震撼震撼震撼 Create Payment Links

For each product震撼震撼震撼:
1. Go to product page
2. Click **"Create payment link"**
3. Settings震撼震撼震撼:
   - Collect customer address: **No**
   - Collect phone number: **No**
   - After payment震撼震撼震撼: Redirect to `/success.html?product=price_book1` (change ID)
4. Copy the payment link震撼震撼震撼震撼震撼震撼 Looks like: `https://buy.stripe.com/test_xxxxx`

### Step 3震撼震撼震撼震撼震撼震撼 Update library-access.html

Replace the placeholder links震撼震撼震撼:

```javascript
const STRIPE_LINKS = {
    'price_bundle': 'https://buy.stripe.com/BUNDLE_LINK震撼震撼震撼',
    'price_book1': 'https://buy.stripe.com/BOOK1_LINK',
    'price_book2': 'https://buy.stripe.com/BOOK2_LINK',
    'price_book3': 'https://buy.stripe.com/BOOK3_LINK',
    'price_book4': 'https://buy.stripe.com/BOOK4_LINK',
    'price_book5': 'https://buy.stripe.com/BOOK5_LINK',
    'price_book6': 'https://buy.stripe.com/BOOK6_LINK',
    'price_book7': 'https://buy.stripe.com/BOOK7_LINK'
};
```

With your real Stripe payment links震撼震撼震撼

---

## Testing震撼震撼震撼

1. Open: http://localhost:3000/library-access.html
2. Click **"BUY BOOK 1"**
3. Should redirect to Stripe checkout震撼震撼震撼
4. Use test card震撼震撼震撼震撼震撼震撼 `4242 4242 4242 4242`
5. After payment震撼震撼震撼震撼震撼震撼 Should redirect to success.html震撼震撼震撼

---

## Ready for Production震撼震撼震撼

Once tested震撼震撼震撼:
1. Switch Stripe to **live mode**
2. Create same products in live mode
3. Update payment links in code
4. Deploy to Railway震撼震撼震撼

---

**Total Revenue Potential震撼震撼震撼**:
- 7 books × $24.99 = $174.93 (if sold individually)
- Bundle = $99
- Savings = $75震撼震撼震撼
- Target震撼震撼震撼震撼震撼震撼 100 bundles/month = $9,900 MRR震撼震撼震撼
