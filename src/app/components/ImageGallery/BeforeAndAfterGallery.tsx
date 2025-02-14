// BeforeAndAfterGallery.tsx
"use client";
import React, { useRef } from "react";
import ExpandedModal from "./ExpandedModal/ExpandedModal";
import ModalThumbnailList from "./ExpandedModal/ModalThumbnailList";
import ModalContent from "./ExpandedModal/ModalContent";
import useGalleryState from "./useGalleryState";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";
import { StyleSheetManager } from "styled-components";
import PageSection from "../PageSection";

interface BeforeAfterGalleryProps {
  images: string[];
  bgcolor?: string;
}

const BeforeAndAfterGallery: React.FC<BeforeAfterGalleryProps> = ({
  images,
  bgcolor,
}) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  // Use the same shouldForwardProp function as before.
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

  // Reuse the gallery state hook.
  const {
    loading,
    selectedMediaIndex,
    modalSelectedImageIndex,
    mediaItems,
    modalVisible,
    modalImageMaxHeight,
    handleGalleryClick, // toggles modal visibility
    openModalAtIndex, // opens modal at a specific image (sets the active index)
    handleModalThumbnailClick,
    handleModalGalleryScroll,
  } = useGalleryState(images, galleryRef);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      {modalVisible ? (
        // Modal view: show one active image with thumbnail navigation below
        <div onClick={(e) => e.stopPropagation()}>
          <ExpandedModal
            toggleShowModal={handleGalleryClick}
            modalVisible={modalVisible}
          >
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
        // Non-modal view: show images in a grid with header and overlay labels.
        <PageSection className="!pt-0" bgcolor={bgcolor ? bgcolor : ""}>
          <div
            ref={galleryRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
          >
            {mediaItems.map((src, index) => (
              <div
                key={index}
                className="cursor-zoom-in"
                onClick={() => openModalAtIndex(index)}
              >
                <div className="relative w-full aspect-[4/3]">
                  {/* Image without absolute positioning */}
                  <img
                    src={src}
                    alt={`Before and After image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  {/* Overlay label for before and after */}
                  {mediaItems.length === 2 && (
                    <div className="absolute bottom-2 left-2 bg-white bg-opacity-75 px-2 py-1 text-sm font-bold rounded">
                      {index === 0 ? "Before" : "After"}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </PageSection>
      )}
    </StyleSheetManager>
  );
};

export default BeforeAndAfterGallery;
