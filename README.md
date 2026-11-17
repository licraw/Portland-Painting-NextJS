# Portland-Painting-NextJS

The Portland Painting and Restoration website, built with Next.js 15, React,
and TypeScript.

## Requirements

- Node.js 22.x
- Yarn 1.22.22

## Getting Started

```bash
yarn install --frozen-lockfile
cp .env.example .env.local
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

Most pages work without integration credentials. Add only the variables needed
for the feature you are developing to `.env.local`; see `.env.example` for the
complete list.

## Commands

```bash
yarn dev             # Start the local development server
yarn lint            # Run ESLint
yarn tsc --noEmit    # Run the TypeScript checker
yarn build           # Create a production build
yarn start           # Serve a completed production build
```

## Project Stories Admin

Generate a hashed shared password and a session-signing secret:

```bash
yarn admin:setup
```

Copy the two generated values into `.env.local`, restart the development
server, and open [http://localhost:3000/admin](http://localhost:3000/admin).
Admin sessions expire after three hours. Never commit the generated values.

The Project Stories editor also requires these Supabase values in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SECRET_KEY=your-server-only-secret-key
```

Find the URL and API keys in the Supabase project’s **Connect** dialog or under
**Settings → API Keys**. The secret key must remain server-only and must never
use a `NEXT_PUBLIC_` prefix.

Draft project stories are available only through the protected admin preview.
Publishing a story makes it available at `/projects/[slug]` and adds it to the
public sitemap. Returning a published story to draft removes public access.

## Google Reviews Setup

Set these variables in `.env.local`:

```bash
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
GOOGLE_PLACE_ID=your-google-business-place-id
```

The reviews page uses Google Places Details API on the server and falls back to local reviews if either value is missing.

To refresh the checked-in reviews snapshot manually, run:

```bash
node scripts/fetch-google-reviews.mjs
```

## Other Integrations

The form and subscription API routes can also use Asana, SMTP email,
Mailchimp, and reCAPTCHA. Their environment-variable names are documented in
`.env.example`. Never commit real credentials.

## Working With Agents

Repository structure, validation expectations, and change conventions are in
`AGENTS.md`.
