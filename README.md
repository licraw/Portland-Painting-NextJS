# Portland-Painting-NextJS

Repo for Portland Painting and Restoration Next.js site.

## Getting Started

```bash
npm run dev
```

Open `http://localhost:3000`.

## Google Reviews Setup

Add these variables to your local environment:

```bash
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
GOOGLE_PLACE_ID=your-google-business-place-id
```

The reviews page uses Google Places Details API on the server and falls back to local reviews if either value is missing.
