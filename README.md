# BizPulse — Small Business Financial Dashboard

A polished, responsive financial dashboard designed as a portfolio project for small businesses.

## What it includes

- Revenue, expenses, net profit, and cash-balance KPIs
- Cash-flow and revenue trend charts built with vanilla JavaScript Canvas
- Expense-category breakdown
- Searchable/filterable transaction table
- Add-transaction modal
- CSV export
- Monthly budget tracking
- Business-health score and financial insights
- Light/dark mode
- Responsive layout for desktop, tablet, and mobile
- No framework or backend required

## Run locally

Just open `index.html` in a browser.

For development, you can also use VS Code's Live Server extension or:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, `app.js`, and `README.md`.
3. Go to **Settings → Pages**.
4. Select the `main` branch and `/root` folder.
5. Save. GitHub will give you a public URL.

## Important portfolio note

This version uses demo data and browser-only state. For a production financial product, add a secure backend, authentication, encrypted storage, database, accounting/bank integrations, audit logging, and server-side validation.

## Suggested next upgrades

- Supabase/PostgreSQL persistence
- User accounts and business workspaces
- Recurring transactions
- Invoice tracking and accounts receivable
- Profit-and-loss statements
- Tax estimates
- Bank/Stripe integration
- AI-generated financial insights
- Multi-business support
- Role-based access for owners/accountants
