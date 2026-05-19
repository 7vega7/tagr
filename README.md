# TAGR — NFC Anti-Counterfeiting Label Platform

A Cloudflare Workers website for TAGR's NFC-based anti-counterfeiting service.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — brand showcase, features, how-it-works |
| `/verify` | Label verification — enter or tap NFC code, checks Supabase DB |
| `/api/verify` | POST API — verifies a code against Supabase |

## Languages Supported

- 🇺🇸 English (default)
- 🇮🇩 Bahasa Indonesia
- 🇨🇳 中文 (Chinese Simplified)
- 🇸🇦 العربية (Arabic, RTL)
- 🇫🇷 Français

---

## 🚀 Deploy to Cloudflare Workers via GitHub

### 1. Prerequisites

- [Cloudflare account](https://cloudflare.com)
- [Node.js](https://nodejs.org) 18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### 2. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/tagr.git
cd tagr
npm install
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase_schema.sql`
3. Copy your **Project URL** and **anon/public key** from **Settings → API**

### 4. Configure secrets

For **local development**, create a `.env` file (never commit this):
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

For **production** (Cloudflare), set secrets via Wrangler:
```bash
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_ANON_KEY
```

### 5. Deploy manually

```bash
npm run deploy
```

### 6. Deploy automatically via GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

Then add `CLOUDFLARE_API_TOKEN` to your GitHub repo secrets
(**Settings → Secrets and variables → Actions**).

Get your token from Cloudflare: **My Profile → API Tokens → Create Token → Edit Cloudflare Workers template**.

---

## 🗄️ Supabase Table Structure

The `nfc_labels` table:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `code` | TEXT (UNIQUE) | NFC label code, e.g. `ABCD-1234-XY01` |
| `product_name` | TEXT | Product display name |
| `manufacturer` | TEXT | Brand/manufacturer name |
| `issued_at` | TIMESTAMPTZ | When the label was issued |
| `scan_count` | INTEGER | Running total of scans |
| `last_scanned_at` | TIMESTAMPTZ | Timestamp of last scan |
| `active` | BOOLEAN | Set to false to deactivate a label |
| `metadata` | JSONB | Flexible extra data |

---

## 🔧 Local Development

```bash
# Add secrets to wrangler.toml [vars] for local dev OR use a .dev.vars file:
echo 'SUPABASE_URL=https://your-project.supabase.co' > .dev.vars
echo 'SUPABASE_ANON_KEY=your-anon-key' >> .dev.vars

npm run dev
# Opens at http://localhost:8787
```

---

## 📁 Project Structure

```
tagr/
├── src/
│   ├── worker.js          # Main Cloudflare Workers entry point (routing)
│   ├── pages/
│   │   ├── landing.js     # Landing page HTML
│   │   └── verify.js      # Verify page HTML
│   └── api/
│       └── verify.js      # POST /api/verify → Supabase lookup
├── supabase_schema.sql    # Run this in Supabase SQL Editor
├── wrangler.toml          # Cloudflare Workers config
├── package.json
└── README.md
```

---

## 🔗 NFC Label URL Format

Program each NFC chip to redirect to:
```
https://your-worker.workers.dev/verify?code=ABCD-1234-XY01
```

The verify page will auto-run the check when the `code` query param is present.
