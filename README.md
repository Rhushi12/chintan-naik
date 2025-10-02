# Chintan Naik – Financial Advisory (Static Site)

This folder contains a single-page, static website ready to deploy on Vercel.

## Files
- `index.html` – Main site (copied from your design with branding wired up)
- `screen.png` – Design reference
- `code.html` – Original design source (kept for reference)

## Features
- Smooth scrolling to sections
- Mobile menu toggle
- Contact form validation
- Optional Formspree submission; mailto fallback to `contact@chintannaik.com`

To enable Formspree, set the `data-endpoint` attribute on the `<form id="contactForm">` in `index.html`:

```html
<form id="contactForm" data-endpoint="https://formspree.io/f/YOUR_ID" novalidate>
```

## Deploy on Vercel
1. Install Vercel CLI (optional):
   - `npm i -g vercel`
2. From the `financial_advisor_home/` directory, run:
   - `vercel` (first deploy, follow prompts)
   - `vercel --prod` (to promote to production)

Alternatively, drag-and-drop this folder into the Vercel dashboard as a new project. Framework preset: “Other / Static”.

## Customization
- Replace the contact email in the script near the end of `index.html` if needed.
- Update images or copy as required; it’s all in one HTML file.

## Backend (Serverless) Setup

- API route: `api/contact.js` (Node 20) sends email via Resend.
- Install dependencies (if using CLI locally):

```bash
npm install
```

- Environment variables (Vercel → Project Settings → Environment Variables):
  - `RESEND_API_KEY` – required. Get from https://resend.com
  - `TO_EMAIL` – default `contact@chintannaik.com`
  - `FROM_EMAIL` – default `website@resend.dev` (or your verified Resend domain)

`index.html` contact form posts to `/api/contact`. On success it shows a success message; on error it falls back to opening your email client.

## vercel.json

`vercel.json` pins Node 20 for functions and routes all paths to `index.html` except `/api/*`.

```json
{
  "version": 2,
  "functions": { "api/**/*.js": { "runtime": "nodejs20.x" } },
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```
