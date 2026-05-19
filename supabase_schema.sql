-- TAGR Supabase Schema
-- Run this in your Supabase SQL Editor

-- Create the nfc_labels table
CREATE TABLE IF NOT EXISTS nfc_labels (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code          TEXT NOT NULL UNIQUE,          -- e.g. "ABCD-1234-XY01"
  product_name  TEXT,                          -- e.g. "Premium Sneaker v2"
  manufacturer  TEXT,                          -- e.g. "Acme Brand Co."
  issued_at     TIMESTAMPTZ DEFAULT NOW(),     -- when the label was issued
  scan_count    INTEGER DEFAULT 0,             -- total number of scans
  last_scanned_at TIMESTAMPTZ,                 -- last scan timestamp
  active        BOOLEAN DEFAULT TRUE,          -- can be deactivated
  metadata      JSONB DEFAULT '{}'::JSONB,     -- extra data, e.g. batch info
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Index on code for fast lookups
CREATE INDEX IF NOT EXISTS idx_nfc_labels_code ON nfc_labels (code);

-- Row Level Security (optional but recommended)
ALTER TABLE nfc_labels ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads (for public verification)
CREATE POLICY "Allow public read" ON nfc_labels
  FOR SELECT USING (active = TRUE);

-- Allow anonymous updates ONLY to scan_count and last_scanned_at
-- (for the scan counter increment in the verify API)
CREATE POLICY "Allow scan count update" ON nfc_labels
  FOR UPDATE USING (active = TRUE)
  WITH CHECK (active = TRUE);

-- ────────────────────────────────────────────
-- SAMPLE DATA (for testing)
-- ────────────────────────────────────────────
INSERT INTO nfc_labels (code, product_name, manufacturer, issued_at)
VALUES
  ('ABCD-1234-XY01', 'Limited Edition Sneaker', 'Brand Corp Indonesia', NOW() - INTERVAL '30 days'),
  ('BETG-0001-AA01', 'Premium Watch Series 7', 'Luxe Timepieces Ltd.', NOW() - INTERVAL '60 days'),
  ('TEST-DEMO-0001', 'Sample Product (Demo)', 'TAGR Demo', NOW())
ON CONFLICT (code) DO NOTHING;
