# Next Level Restoration Consultant — Lead-Gen Funnel

A complete, high-converting landing-page funnel for the **Funding-as-a-Service** offer
(restoration & cleaning contractors). Built to drop into **GoHighLevel (GHL)** or any
static host.

## The funnel (all steps included)

| # | File | Purpose | Sends to |
|---|------|---------|----------|
| 1 | `index.html` | Sales / landing page — hook, problem, how-it-works, the numbers, who-it's-for, social proof, FAQ, CTAs | `apply.html` |
| 2 | `apply.html` | 4-step qualification application (industry → business size → bottleneck → contact). Progress bar, auto-advancing choice cards, validation | `booking.html` |
| 3 | `booking.html` | Calendar step — drop your **GHL calendar embed** here | `thank-you.html` |
| 4 | `thank-you.html` | Booking confirmation + "what happens next" + add-to-calendar | — |

Shared assets live in `assets/` (`styles.css`, `app.js`, `logo.svg`).

## Brand & design system

- **Colors:** charcoal/near-black `#15171C` + bright brand red `#E11D26` on white (matches the logo & site).
- **Type:** Lexend (headings) + Source Sans 3 (body) — corporate, trustworthy, accessible.
- **Tokens:** all colors/spacing are CSS variables at the top of `assets/styles.css` — change them in one place.
- Responsive (375 → 1440px), keyboard-accessible, `prefers-reduced-motion` respected, WCAG-minded contrast.

> The header/footer logo is a faithful **SVG recreation** of the "NEXT LEVEL — Restoration
> Consultant" mark. Swap in the official asset by replacing the inline `<svg class="brand__mark">`
> blocks (or point an `<img>` at `assets/logo.svg`).

## Deploying in GoHighLevel

You have two easy options:

### Option A — Rebuild as a GHL Funnel (recommended)
1. Create a Funnel with 4 steps mirroring the files above.
2. On each step, add a **Custom Code / HTML** element and paste the `<body>` contents of the
   matching file. Paste the contents of `assets/styles.css` into the funnel's
   **Custom CSS**, and `assets/app.js` into **Footer Tracking Code** (wrapped in `<script>`).
3. **Step 1 → 2:** point the "Apply" buttons at your step-2 URL.
4. **Step 2 (form):** either keep this custom form (it redirects via `data-redirect`) **or**
   replace it with a native GHL form so submissions land in your CRM. To keep the custom form,
   add a webhook/inbound action — see "Wiring up the form" below.
5. **Step 3 (calendar):** use a GHL **Calendar** element, or paste your calendar iframe into
   `booking.html` where the marked comment block is. Set the calendar's **redirect after
   booking** to the thank-you step.
6. **Step 4:** thank-you / confirmation page.

### Option B — Host the static files
Upload the whole `funnel/` folder to any static host (Netlify, Vercel, S3, your domain).
The relative links between pages and to `assets/` already work. Then connect your real domain
(fixes the "not connected to proper domain" issue from the notes).

## Wiring up the form (apply.html)

`assets/app.js` currently validates each step and then redirects to `data-redirect`
(`booking.html`). To capture leads, do **one** of these:

- **GHL native form:** replace the `<form data-multistep>` with a GHL form embed and set its
  redirect to `booking.html`.
- **Webhook:** in `app.js`, inside the `form.addEventListener('submit', …)` handler, `fetch()`
  POST the field values to your GHL inbound webhook before the redirect. All inputs already have
  `name` attributes (`industry`, `size`, `bottleneck`, `firstName`, `lastName`, `business`,
  `email`, `phone`).

## Update before launch (placeholders)

- Phone `(000) 000-0000` → real number (in `index.html`, `thank-you.html`, `tel:` links).
- Email `hello@nextlevelrc.com` → real inbox.
- Privacy / Terms footer links.
- GHL calendar embed + booking redirect.
- Testimonials are clearly labeled illustrative — swap for real contractor quotes when available.

## Notes on copy/compliance

The offer is presented honestly per the meeting notes: it leads with the **"funding"** hook but
clearly explains the **partnership / done-for-you** model (no loan, no debt; ~25% revenue share,
contractor keeps the client). The FAQ and footer disclaimer reinforce that this is a business
partnership, not a lending product — which both converts better and reduces unqualified leads.
