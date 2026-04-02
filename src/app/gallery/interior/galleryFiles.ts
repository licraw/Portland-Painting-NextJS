import fs from "fs";
import path from "path";

const interiorGalleryDir = path.join(
  process.cwd(),
  "public",
  "images",
  "interior",
  "gallery"
);

const interiorLandingDir = path.join(
  process.cwd(),
  "public",
  "images",
  "interior",
  "landing"
);

const supportedImageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
]);

const toGalleryImagePath = (fileName: string) =>
  `/images/interior/gallery/${fileName}`;

const toLandingImagePath = (fileName: string) =>
  `/images/interior/landing/${fileName}`;

const marketingLeadImageFileNames = [
  "Photo Mar 26 2025, 5 39 20 PM.jpg",
  "Photo Mar 26 2025, 5 37 23 PM.jpg",
  "12Parker.jpg",
  "SE Miller st (1).JPG",
  "SE Miller st.JPG",
  "15Parker.jpg",
  "13Parker.jpg",
  "22103.jpg",
  "22103 (2).jpg",
  "22103 (3).jpg",
  "2238 (21).jpg",
  "2238 (20).jpg",
  "2238 (22).jpg",
  "21168 (21).JPG",
  "21168 (20).JPG",
  "2206.jpg",
  "2206 (3).jpg",
];

const hiddenImageFileNames = new Set([
  "01Parker.png",
  "02Parker.png",
  "0Parker.png",
  "1Parker.jpg",
  "3Parker.jpg",
  "5Parker.jpg",
  "11Parker.jpg",
  "14Parker.jpg",
  "2016 (36).jpg",
  "2016 (37).jpg",
  "2016 (50).JPG",
  "2016 (51).JPG",
  "2016 (66).JPG",
  "2016 (67).jpg",
  "2016 (70).jpg",
  "2016.png",
  "2019 (2).png",
  "2019 (3).png",
  "2019 (4).png",
  "2019 (5).png",
  "2019.png",
  "2198.png",
  "2198 (2).png",
  "22139.png",
  "2375 - 1.png",
  "Corbin1.png",
  "Dai 1.png",
  "Dai 2.png",
  "Dai 3.png",
  "Dai 4.png",
  "Sandys - 0.png",
  "Sandys - 1 before.png",
  "Sandys - 2.png",
  "Sandys - 3.png",
  "Sandys - 4.png",
  "Sandys - 5.png",
  "corbin.png",
  "st (1).png",
  "st (2).png",
  "1206511711656257.PlMFnZjXSdgZumaCWHZg_height640.png",
  "Photo Mar 26 2025, 5 31 38 PM.jpg",
  "Photo Mar 26 2025, 5 42 51 PM.jpg",
  "image-1 (1).jpg",
  "image-2 (1).jpg",
  "image-3 (1).jpg",
  "image-4 (1).jpg",
  "image-5 (1).jpg",
  "image-6 (1).jpg",
  "image-7 (1).jpg",
  "image-8 (1).jpg",
  "image-9 (1).jpg",
  "image-11 (1).jpg",
  "image-16 (1).jpg",
  "image-18 (1).jpg",
]);

const getSortedImageFileNames = (directory: string) =>
  fs
    .readdirSync(directory)
    .filter((fileName) =>
      supportedImageExtensions.has(path.extname(fileName).toLowerCase())
    )
    .sort((left, right) =>
      left.localeCompare(right, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );

const getOrderedVisibleImageFileNames = (directory: string) => {
  const allImageFileNames = getSortedImageFileNames(directory);
  const visibleImageFileNames = allImageFileNames.filter(
    (fileName) => !hiddenImageFileNames.has(fileName)
  );
  const marketingLeadSet = new Set(marketingLeadImageFileNames);

  return [
    ...marketingLeadImageFileNames.filter((fileName) =>
      visibleImageFileNames.includes(fileName)
    ),
    ...visibleImageFileNames.filter((fileName) => !marketingLeadSet.has(fileName)),
  ];
};

const orderedGalleryImageFileNames =
  getOrderedVisibleImageFileNames(interiorGalleryDir);

const orderedLandingImageFileNames =
  getOrderedVisibleImageFileNames(interiorLandingDir);

const serviceGalleryOneLeadImageFileNames = [
  "2Parker.jpg",
  "10Parker.jpg",
  "13Parker.jpg",
  "2016 (2).jpg",
];

const serviceGalleryTwoLeadImageFileNames = [
  "2016 (20).jpg",
  "2016 (25).jpg",
  "2016 (44).jpg",
  "2016 (48).jpg",
];

const serviceLeadImageSet = new Set([
  ...serviceGalleryOneLeadImageFileNames,
  ...serviceGalleryTwoLeadImageFileNames,
]);

const remainingServiceImageFileNames = orderedLandingImageFileNames.filter(
  (fileName) => !serviceLeadImageSet.has(fileName)
);

const serviceSplitIndex = Math.ceil(
  remainingServiceImageFileNames.length / 2
);

export const interiorServiceGalleryOneImages = [
  ...serviceGalleryOneLeadImageFileNames.filter((fileName) =>
    orderedLandingImageFileNames.includes(fileName)
  ),
  ...remainingServiceImageFileNames.slice(0, serviceSplitIndex),
].map(toLandingImagePath);

export const interiorServiceGalleryTwoImages = [
  ...serviceGalleryTwoLeadImageFileNames.filter((fileName) =>
    orderedLandingImageFileNames.includes(fileName)
  ),
  ...remainingServiceImageFileNames.slice(serviceSplitIndex),
].map(toLandingImagePath);

export default orderedGalleryImageFileNames.map(toGalleryImagePath);
