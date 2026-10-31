# Bloomora Decor 🌸 (Delhi NCR)

A complete, production-quality fresh flower and balloon decoration e-commerce and booking web application. Inspired by [Lovable Decoration](https://decoration.lovable.app/), but built to be cleaner, faster, fully responsive, and packed with Delhi NCR-specific booking features.

---

## 🌟 Key Features

### 1. Global & Responsive Design
- **Color Palette:** Luxury floral aesthetic (Blush Pink, Rose, Gold, Cream, Sand).
- **Typography:** Playfair Display (editorial serif headings) + Inter (clean sans body).
- **Top Announcement Bar:** Dismissible festive offer banner (`BLOOM10` for 10% off), editable from config or admin panel.
- **Header:** Sticky header with city selector (Delhi, Noida, Gurgaon, Ghaziabad, Faridabad, Greater Noida), search bar, wishlist count, account link, and cart badge.
- **Occasions Mega-Menu:** Covers all **15 celebration categories** with emojis, item counts, and live preview image cards.
- **Mobile First:** Sticky bottom navigation bar with 3 direct touch actions: **Call Now**, **WhatsApp**, and **Book Now**.
- **Desktop Floating Widget:** WhatsApp chat widget with prefilled quick inquiries (*Same-day available?*, *Time slots*, *Cancel booking*).

### 2. 15 Occasions Supported
1. Birthday 🎂
2. Anniversary 💍
3. Wedding 💒
4. Haldi & Mehndi 🌼
5. Baby Shower 👶
6. Welcome Baby 🍼
7. Naming Ceremony ✨
8. Engagement 💎
9. Griha Pravesh 🪔
10. First Night 🌹
11. Proposal 💖
12. Corporate 🏢
13. Festival 🎆
14. Pooja & Mandir 🙏
15. Car Decoration 🚗

### 3. Realistic Catalog (40+ Seeded Designs)
Includes signature arrangements:
- **Blush Rose Ring Backdrop** (₹3,499)
- **Golden Balloon & Bloom Arch** (₹2,499)
- **Rose Petal Room Surprise** (₹2,999)
- **Royal Marigold Mandap** (₹45,999)
- **Sunshine Haldi Corner** (₹8,999)
- **Oh Baby Pastel Wall** (₹3,999)
- **Suhaag Raat Rose Canopy** (₹6,999)
- Plus daily fresh bouquets (*Pink Peony Love*, *Classic 24 Red Roses*, *White Lily Grace*, *Orchid Elegance*).

### 4. Critical Booking & Delivery Engine
- **Delhi NCR Service Area Check:** Validates 6-digit pincodes (Delhi: `11xxxx`, Gurgaon: `122xxx`, Noida: `2013xx`, Ghaziabad: `2010xx`, Faridabad: `121xxx`).
- **Live IST Same-Day Cutoff:** Cutoff set at **4:00 PM IST** (16:00). Shows real-time countdown timer before 4 PM. Automatically disables same-day delivery after 4 PM with a gentle reminder to pick tomorrow.
- **Flexible Time Slots:**
  - 4-Hour Standard Windows: Morning (10 AM – 2 PM), Afternoon (2 PM – 6 PM), Evening (6 PM – 10 PM) with live availability indicators.
  - 3-Hour Flexible Window (e.g. 4 PM – 7 PM).
  - Fixed-Time Delivery Upgrade (+₹299 configurable fee for exact finish minute).
- **Advance Payment System:** 30% advance deposit to confirm slot; 70% balance payable on delivery after visual inspection.
- **Fair Cancellation Policy:**
  - **> 48 hours:** 100% full advance refund.
  - **24 – 48 hours:** 50% advance refund.
  - **< 24 hours:** Non-refundable (fresh flowers are harvested).
  - Instant cancel button in `/account` with automated refund calculation.

### 5. Cart, Checkout & Account
- **Slide-out Cart Drawer & Full `/cart` Page:** Live item breakdown, quantity modifiers, and promo code verification (`BLOOM10`, `WELCOME500`, `FESTIVE15`).
- **5-Step Checkout Wizard:** Contact Info → Event Customization (Banner/Neon text) → Venue Address & Lift Access → Schedule → Payment (UPI / Card / Net Banking / Pay on Delivery).
- **Order Success Page:** Order Reference ID, celebratory confetti, WhatsApp dispatch message, and Add-to-Calendar.
- **Customer Account (`/account`):** Phone OTP login (mock OTP `1234`), order history, cancellation modal, and saved addresses.

### 6. Admin Control Center (`/admin`)
- Master password login (Password: `bloomora123` or `admin`).
- Order status manager (`new` → `confirmed` → `decorating` → `completed` → `cancelled`).
- Full CRUD for decorations.
- Real-time config: Change same-day cutoff hour, fixed-time fee, advance payment percentage, announcement bar text, and promo coupons.
- Blocked dates calendar manager.

### 7. Centralized Site Configuration (`/src/config/site.ts`)
All brand details, phone/WhatsApp number (`9717212164`), email, cities, delivery fees, and booking rules reside in **one single file**.

---

## 🛠️ Technology Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v3 + CSS Variables + Glassmorphism
- **Icons:** Lucide React
- **Animations & Effects:** Canvas Confetti + Framer Motion-ready structure
- **Fonts:** Playfair Display + Inter (via `next/font/google`)
- **SEO:** Schema.org `LocalBusiness` and `Product` JSON-LD, Dynamic Sitemap (`/sitemap.xml`), Robots (`/robots.txt`).

---

## 🚀 Getting Started

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
\`\`\`bash
npm run build
npm run start
\`\`\`

---

## ☁️ Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select the repository.
4. Set the Framework Preset to **Next.js**.
5. Click **Deploy**. No additional environment variables are required out of the box as the mock data layer is self-contained.
