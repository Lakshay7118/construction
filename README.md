# Kalpataru Constructions — Frontend

Public-facing Next.js site built from the BRD/SOW. Currently running on mock
data in `src/lib/data.ts` — swap this for real MongoDB Atlas + Mongoose reads
when the backend is wired up (see the schema shapes already used here, they
map 1:1 to the models discussed earlier).

## Run locally
```
npm install
npm run dev
```

## Pages included (per BRD sitemap)
- Home
- About
- Services (list + per-service detail: Residential, Commercial, Industrial, Infrastructure)
- Projects → City grid → City detail → Individual project site (gallery, before/after slider, timeline, materials, spec sheet)
- Gallery (cross-city masonry)
- Journal / Blogs (list + detail)
- Careers (list + detail + application form)
- Contact
- Request a Quote

## Design system
- Palette: concrete (#ECE8E1), charcoal (#191714), blueprint navy (#142B45), safety-orange accent (#FF4E14)
- Type: Archivo Expanded (display), IBM Plex Sans (body), IBM Plex Mono (data/labels)
- Signature motif: blueprint grid + architectural corner tick marks, used across heroes and city cards
