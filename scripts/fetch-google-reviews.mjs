#!/usr/bin/env node

import { writeFile } from "node:fs/promises";

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;
const outputPath = process.env.GOOGLE_REVIEWS_OUTPUT ?? "src/data/google-reviews.json";

if (!apiKey || !placeId) {
  console.error("Missing GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID");
  process.exit(1);
}
// test for capturing git. 
const placeResource = placeId.startsWith("places/") ? placeId : `places/${placeId}`;
const endpoint = `https://places.googleapis.com/v1/${placeResource}`;

const response = await fetch(endpoint, {
  headers: {
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask":
      "id,displayName,rating,userRatingCount,reviews,googleMapsUri",
  },
});
if (!response.ok) {
  console.error(`Google Places request failed: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const payload = await response.json();
if (!payload?.id) {
  console.error("Google Places returned invalid payload");
  process.exit(1);
}

const reviews = Array.isArray(payload.reviews)
  ? payload.reviews.map((review) => ({
      author_name: review.authorAttribution?.displayName,
      profile_photo_url: review.authorAttribution?.photoUri,
      rating: review.rating,
      relative_time_description: review.relativePublishTimeDescription,
      text: review.text?.text,
      time: review.publishTime,
      author_url: review.authorAttribution?.uri,
      language: review.text?.languageCode,
      original_language: review.originalText?.languageCode,
    }))
  : [];

const output = {
  source: "google-places",
  place_id: placeId,
  name: payload.displayName?.text ?? null,
  url: payload.googleMapsUri ?? null,
  rating: payload.rating ?? null,
  user_ratings_total: payload.userRatingCount ?? null,
  fetched_at: new Date().toISOString(),
  review_count: reviews.length,
  reviews,
};

await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`Wrote ${reviews.length} reviews to ${outputPath}`);
