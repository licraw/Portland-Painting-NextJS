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

## Blog From Google Sheets (HTML)

You can keep using local markdown files in `content/`, and also publish blog posts from Google Sheets.

Add these variables:

```bash
BLOG_SHEET_ID=your-google-sheet-id
BLOG_SHEET_RANGE=Blogs!A:G
GOOGLE_SHEETS_API_KEY=your-google-api-key
```

Expected sheet columns (header row):

- `slug` (optional, auto-generated from title if empty)
- `title`
- `description`
- `date` (ISO or any JS-parseable date)
- `image` (absolute URL or public path like `/img/post.png`)
- `html` (the full HTML string for the post body)
- `published` (`true/false`, optional; defaults to published)

Notes:

- If the same slug exists in both sheet and local markdown, the sheet post wins.
- Sheet content is rendered as HTML (with basic server-side sanitizing).
