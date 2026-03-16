import fs from "fs";
import path from "path";

const interiorGalleryDir = path.join(
  process.cwd(),
  "public",
  "gallery",
  "interior"
);
const supportedImageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
]);

const marketingLeadImageFiles = [
  "/gallery/interior/Photo Mar 26 2025, 5 39 20 PM.jpg",
  "/gallery/interior/Photo Mar 26 2025, 5 37 23 PM.jpg",
  "/gallery/interior/12Parker.jpg",
  "/gallery/interior/SE Miller st (1).JPG",
  "/gallery/interior/SE Miller st.JPG",
  "/gallery/interior/15Parker.jpg",
  "/gallery/interior/13Parker.jpg",
  "/gallery/interior/22103.jpg",
  "/gallery/interior/22103 (2).jpg",
  "/gallery/interior/22103 (3).jpg",
  "/gallery/interior/2238 (21).jpg",
  "/gallery/interior/2238 (20).jpg",
  "/gallery/interior/2238 (22).jpg",
  "/gallery/interior/21168 (21).JPG",
  "/gallery/interior/21168 (20).JPG",
  "/gallery/interior/2206.jpg",
  "/gallery/interior/2206 (3).jpg",
];

const hiddenImageFiles = new Set([
  "/gallery/interior/01Parker.png",
  "/gallery/interior/02Parker.png",
  "/gallery/interior/0Parker.png",
  "/gallery/interior/1Parker.jpg",
  "/gallery/interior/3Parker.jpg",
  "/gallery/interior/5Parker.jpg",
  "/gallery/interior/11Parker.jpg",
  "/gallery/interior/14Parker.jpg",
  "/gallery/interior/2016 (36).jpg",
  "/gallery/interior/2016 (37).jpg",
  "/gallery/interior/2016 (50).JPG",
  "/gallery/interior/2016 (51).JPG",
  "/gallery/interior/2016 (66).JPG",
  "/gallery/interior/2016 (67).jpg",
  "/gallery/interior/2016 (70).jpg",
  "/gallery/interior/2016.png",
  "/gallery/interior/2019 (2).png",
  "/gallery/interior/2019 (3).png",
  "/gallery/interior/2019 (4).png",
  "/gallery/interior/2019 (5).png",
  "/gallery/interior/2019.png",
  "/gallery/interior/2198.png",
  "/gallery/interior/2198 (2).png",
  "/gallery/interior/22139.png",
  "/gallery/interior/2375 - 1.png",
  "/gallery/interior/Corbin1.png",
  "/gallery/interior/Dai 1.png",
  "/gallery/interior/Dai 2.png",
  "/gallery/interior/Dai 3.png",
  "/gallery/interior/Dai 4.png",
  "/gallery/interior/Sandys - 0.png",
  "/gallery/interior/Sandys - 1 before.png",
  "/gallery/interior/Sandys - 2.png",
  "/gallery/interior/Sandys - 3.png",
  "/gallery/interior/Sandys - 4.png",
  "/gallery/interior/Sandys - 5.png",
  "/gallery/interior/corbin.png",
  "/gallery/interior/st (1).png",
  "/gallery/interior/st (2).png",
  "/gallery/interior/1206511711656257.PlMFnZjXSdgZumaCWHZg_height640.png",
  "/gallery/interior/Photo Mar 26 2025, 5 31 38 PM.jpg",
  "/gallery/interior/Photo Mar 26 2025, 5 42 51 PM.jpg",
  "/gallery/interior/image-1 (1).jpg",
  "/gallery/interior/image-2 (1).jpg",
  "/gallery/interior/image-3 (1).jpg",
  "/gallery/interior/image-4 (1).jpg",
  "/gallery/interior/image-5 (1).jpg",
  "/gallery/interior/image-6 (1).jpg",
  "/gallery/interior/image-7 (1).jpg",
  "/gallery/interior/image-8 (1).jpg",
  "/gallery/interior/image-9 (1).jpg",
  "/gallery/interior/image-11 (1).jpg",
  "/gallery/interior/image-16 (1).jpg",
  "/gallery/interior/image-18 (1).jpg",
]);

const allImageFiles = fs
  .readdirSync(interiorGalleryDir)
  .filter((fileName) =>
    supportedImageExtensions.has(path.extname(fileName).toLowerCase())
  )
  .sort((left, right) =>
    left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" })
  )
  .map((fileName) => `/gallery/interior/${fileName}`);

const visibleImageFiles = allImageFiles.filter(
  (fileName) => !hiddenImageFiles.has(fileName)
);

const marketingLeadSet = new Set(marketingLeadImageFiles);

const orderedImageFiles = [
  ...marketingLeadImageFiles.filter((fileName) => visibleImageFiles.includes(fileName)),
  ...visibleImageFiles.filter((fileName) => !marketingLeadSet.has(fileName)),
];

const serviceGalleryOneLeadImageFiles = [
  "/gallery/interior/2Parker.jpg",
  "/gallery/interior/10Parker.jpg",
  "/gallery/interior/13Parker.jpg",
  "/gallery/interior/2016 (2).jpg",
];

const serviceGalleryTwoLeadImageFiles = [
  "/gallery/interior/2016 (20).jpg",
  "/gallery/interior/2016 (25).jpg",
  "/gallery/interior/2016 (44).jpg",
  "/gallery/interior/2016 (48).jpg",
];

const serviceLeadImageSet = new Set([
  ...serviceGalleryOneLeadImageFiles,
  ...serviceGalleryTwoLeadImageFiles,
]);

const remainingServiceImageFiles = orderedImageFiles.filter(
  (fileName) => !serviceLeadImageSet.has(fileName)
);

const serviceSplitIndex = Math.ceil(remainingServiceImageFiles.length / 2);

export const interiorServiceGalleryOneImages = [
  ...serviceGalleryOneLeadImageFiles.filter((fileName) =>
    orderedImageFiles.includes(fileName)
  ),
  ...remainingServiceImageFiles.slice(0, serviceSplitIndex),
];

export const interiorServiceGalleryTwoImages = [
  ...serviceGalleryTwoLeadImageFiles.filter((fileName) =>
    orderedImageFiles.includes(fileName)
  ),
  ...remainingServiceImageFiles.slice(serviceSplitIndex),
];

export default orderedImageFiles;
