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
    handleGalleryClick, // used for toggling (closing) the modal
    handleModalThumbnailClick,
    handleModalGalleryScroll,
    openModalAtIndex, // new method for opening modal at a specific index
  } = useGalleryState(images, masonryRef);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      {modalVisible ? (
        <div onClick={(e) => e.stopPropagation()}>
          <ExpandedModal
            toggleShowModal={handleGalleryClick} // still using the original toggle to close the modal
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
        // padding-top 0 tailwind class
        <PageSection className="!pt-0" bgcolor="white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaItems.map((src, index) => (
              <div
                key={index}
                className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md"
                // Instead of toggling the modal with handleGalleryClick,
                // use openModalAtIndex so the correct image index is set.
                onClick={() => openModalAtIndex(index)}
              >
                <img
                  src={src}
                  alt={`Exterior Project ${index + 1}`}
                  className="object-cover w-full h-full cursor-zoom-in"
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
