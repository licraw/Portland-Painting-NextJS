#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";

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

const fetchedReviews = Array.isArray(payload.reviews)
  ? payload.reviews
      .filter((review) => (review.rating ?? 0) >= 4)
      .map((review) => ({
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

let savedReviews = [];
try {
  const savedSnapshot = JSON.parse(await readFile(outputPath, "utf8"));
  savedReviews = Array.isArray(savedSnapshot.reviews)
    ? savedSnapshot.reviews.filter((review) => (review.rating ?? 0) >= 4)
    : [];
} catch (error) {
  if (error?.code !== "ENOENT") {
    console.warn(`Could not read the existing review snapshot: ${error.message}`);
  }
}

const reviewKey = (review) =>
  review.author_url && review.time
    ? `${review.author_url}|${review.time}`
    : `${review.author_name ?? ""}|${review.time ?? ""}|${review.text ?? ""}`;

const reviewsByKey = new Map();
for (const review of [...savedReviews, ...fetchedReviews]) {
  reviewsByKey.set(reviewKey(review), review);
}

const reviews = [...reviewsByKey.values()].sort((a, b) => {
  const aTime = a.time ? new Date(a.time).getTime() : 0;
  const bTime = b.time ? new Date(b.time).getTime() : 0;
  return bTime - aTime;
});

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
console.log(
  `Fetched ${fetchedReviews.length} qualifying reviews; wrote ${reviews.length} total reviews to ${outputPath}`,
);
