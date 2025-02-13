// "use client";
// import React, { useRef } from "react";
// import ThumbnailList from "./ThumbnailList";
// import GalleryContent from "./GalleryContent";
// import ExpandedModal from "./ExpandedModal/ExpandedModal";
// import {
//   GalleryContainer,
//   ScrollThumbsDownButton,
//   ScrollThumbsUpButton,
//   ModalContainer,
//   ThumbnailListBackground,
// } from "./Styles";
// import ModalThumbnailList from "./ExpandedModal/ModalThumbnailList";
// import ModalContent from "./ExpandedModal/ModalContent";
// import useGalleryState from "./useGalleryState";
// import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";
// import DirectionalArrow from "../Icons/DirectionalArrow";
// import { StyleSheetManager } from "styled-components";

// interface GalleryProps {
//   images: string[];
// }

// const ImageGallery: React.FC<GalleryProps> = ({ images }) => {
//   const thumbnailListRef = useRef<HTMLDivElement>(null);

//   const shouldForwardProp = (prop: string): boolean =>
//     ![
//       "paddingTopPercentage",
//       "widthPercentage",
//       "modalImageMaxHeight",
//       "mobileMaxHeight",
//       "isModal",
//       "mobileDisplay",
//       "siteId",
//       "mobileZoomRate",
//       "zoomRate",
//       "mediaItemsLength",
//     ].includes(prop);

//   const {
//     loading,
//     selectedMediaIndex,
//     modalSelectedImageIndex,
//     mediaItems,
//     modalVisible,
//     modalImageMaxHeight,
//     showUpArrow,
//     showDownArrow,
//     handleThumbnailClick,
//     handleGalleryScroll,
//     handleThumbnailScroll,
//     handleGalleryClick,
//     handleModalThumbnailClick,
//     handleModalGalleryScroll,
//   } = useGalleryState(images, thumbnailListRef);

//   if (loading) {
//     return <SkeletonLoader />;
//   }

//   return (
//     <StyleSheetManager shouldForwardProp={shouldForwardProp}>
//       {modalVisible ? (
//         <ModalContainer onClick={(e) => e.stopPropagation()}>
//           <ExpandedModal toggleShowModal={handleGalleryClick} modalVisible={modalVisible}>
//             <ModalContent
//               onGalleryScroll={handleModalGalleryScroll}
//               mediaItems={mediaItems.map(url => ({ url }))}
//               selectedImageIndex={modalSelectedImageIndex}
//               setSelectedIndex={handleModalThumbnailClick}
//               modalImageMaxHeight={modalImageMaxHeight}
//             />
//           </ExpandedModal>
//           <ModalThumbnailList
//             images={mediaItems}
//             onThumbnailClick={handleModalThumbnailClick}
//             activeIndex={modalSelectedImageIndex}
//             id="image-gallery-modal-thumblist"
//           />
//         </ModalContainer>
//       ) : (
//         <div style={{ position: "relative", maxWidth: "850px", margin: "0 auto" }}>
//           <GalleryContainer onClick={(e) => e.stopPropagation()}>
//             <ThumbnailListBackground />
//             <ThumbnailList
//               mediaItems={mediaItems}
//               ref={thumbnailListRef}
//               onThumbnailClick={handleThumbnailClick}
//               activeIndex={selectedMediaIndex}
//               mediaItemsLength={mediaItems.length}
//             />
//             <GalleryContent
//               onGalleryScroll={handleGalleryScroll}
//               mediaItems={mediaItems}
//               selectedImageIndex={selectedMediaIndex}
//               toggleShowModal={handleGalleryClick}
//               setSelectedIndex={handleThumbnailClick}
//             />
//             {showUpArrow && mediaItems.length > 5 && (
//               <ScrollThumbsUpButton
//                 className="gallery-button"
//                 onClick={() => handleThumbnailScroll(-1)}
//               >
//                 <DirectionalArrow direction="up" fill="#1A1B1B" strokeWidth={1.5} width="12" height="7" />
//               </ScrollThumbsUpButton>
//             )}
//             {showDownArrow && mediaItems.length > 5 && (
//               <ScrollThumbsDownButton
//                 className="gallery-button"
//                 onClick={() => handleThumbnailScroll(1)}
//               >
//                 <DirectionalArrow direction="down" fill="#1A1B1B" strokeWidth={1.5} width="12" height="7" />
//               </ScrollThumbsDownButton>
//             )}
//           </GalleryContainer>
//         </div>
//       )}
//     </StyleSheetManager>
//   );
// };

// export default ImageGallery;

"use client";
import React, { useRef } from "react";
import ExpandedModal from "./ExpandedModal/ExpandedModal";
import ModalThumbnailList from "./ExpandedModal/ModalThumbnailList";
import ModalContent from "./ExpandedModal/ModalContent";
import useGalleryState from "./useGalleryState";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";
import { StyleSheetManager } from "styled-components";
import PageSection from "../PageSection";

interface MasonryGalleryProps {
  images: string[];
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images }) => {
  const masonryRef = useRef<HTMLDivElement>(null);

  // Use the same shouldForwardProp function as before
  const shouldForwardProp = (prop: string): boolean =>
    ![
      "paddingTopPercentage",
      "widthPercentage",
      "modalImageMaxHeight",
      "mobileMaxHeight",
      "isModal",
      "mobileDisplay",
      "siteId",
      "mobileZoomRate",
      "zoomRate",
      "mediaItemsLength",
    ].includes(prop);

  const {
    loading,
    selectedMediaIndex,
    modalSelectedImageIndex,
    mediaItems,
    modalVisible,
    modalImageMaxHeight,
    showUpArrow,
    showDownArrow,
    handleThumbnailClick,
    handleGalleryScroll,
    handleThumbnailScroll,
    handleGalleryClick,
    handleModalThumbnailClick,
    handleModalGalleryScroll,
  } = useGalleryState(images, masonryRef);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      {modalVisible ? (
        <div onClick={(e) => e.stopPropagation()}>
          <ExpandedModal toggleShowModal={handleGalleryClick} modalVisible={modalVisible}>
            <ModalContent
              onGalleryScroll={handleModalGalleryScroll}
              mediaItems={mediaItems.map((url) => ({ url }))}
              selectedImageIndex={modalSelectedImageIndex}
              setSelectedIndex={handleModalThumbnailClick}
              modalImageMaxHeight={modalImageMaxHeight}
            />
          </ExpandedModal>
          <ModalThumbnailList
            images={mediaItems}
            onThumbnailClick={handleModalThumbnailClick}
            activeIndex={modalSelectedImageIndex}
            id="image-gallery-modal-thumblist"
          />
        </div>
      ) : (
        <PageSection bgcolor="white"
          ref={masonryRef}
          style={{ position: "relative", maxWidth: "", margin: "0 auto" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaItems.map((src, index) => (
              <div
                key={index}
                className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md"
                onClick={() => handleGalleryClick()}
              >
                <img
                  src={src}
                  alt={`Exterior Project ${index + 1}`}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </PageSection>
      )}
    </StyleSheetManager>
  );
};

export default MasonryGallery;
