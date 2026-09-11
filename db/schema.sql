-- SuperWeb PostgreSQL schema
-- Run with: psql $DATABASE_URL -f db/schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  company VARCHAR(160),
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(40),
  project_type VARCHAR(80) NOT NULL DEFAULT 'Digital Experience — Website',
  budget VARCHAR(60) NOT NULL DEFAULT 'Let''s discuss',
  message TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);

CREATE TABLE IF NOT EXISTS admin_users (
  email VARCHAR(180) PRIMARY KEY,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id VARCHAR(128) PRIMARY KEY,
  email VARCHAR(180) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions (expires_at);

CREATE TABLE IF NOT EXISTS projects (
  slug VARCHAR(80) PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  category VARCHAR(160) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  year VARCHAR(10) NOT NULL,
  palette VARCHAR(60) NOT NULL DEFAULT 'peach',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO projects (slug, title, category, description, image_url, year, palette, sort_order)
VALUES
  ('maison-eclat', 'Maison Éclat', 'Luxury fashion — Digital Experience', 'A quiet, editorial e-commerce experience where product, typography and negative space do the selling.', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop', '2026', 'rose', 1),
  ('afri-capital', 'Afri Capital', 'Fintech — Platform & Brand System', 'Confidence without cliché. A financial platform that feels institutional, precise and distinctly African.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop', '2026', 'sky', 2),
  ('savanna-house', 'Savanna House', 'Hospitality — Digital Experience', 'An immersive editorial website for a boutique retreat. Architecture, light and stillness as interaction.', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop', '2026', 'sage', 3),
  ('forma-studio', 'Forma Studio', 'Architecture — Editorial platform', 'A portfolio that behaves like a physical archive — slow reveals, generous margins, reverence for work.', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop', '2025', 'peach', 4)
ON CONFLICT (slug) DO NOTHING;
