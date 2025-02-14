"use client";
import React, { useRef } from "react";
import ExpandedModal from "./ExpandedModal/ExpandedModal";
import ModalThumbnailList from "./ExpandedModal/ModalThumbnailList";
import ModalContent from "./ExpandedModal/ModalContent";
import useGalleryState from "./useGalleryState";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";
import { StyleSheetManager } from "styled-components";
import PageSection from "../PageSection";
import Image from "next/image";

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
        <PageSection className="!pt-0 !block" bgcolor="white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaItems.map((src, index) => (
             <div
             key={index}
             className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden shadow-md"
             onClick={() => openModalAtIndex(index)}
           >
             <div className="relative w-full h-full">
               <Image
                 src={src}
                 alt={`Exterior Project ${index + 1}`}
                 fill
                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                 className="object-cover cursor-zoom-in"
               />
             </div>
           </div>
            ))}
          </div>
        </PageSection>
      )}
    </StyleSheetManager>
  );
};

export default MasonryGallery;
