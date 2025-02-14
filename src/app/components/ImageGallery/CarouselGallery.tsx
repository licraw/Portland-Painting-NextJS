// CarouselGallery.tsx
"use client";
import React, { useEffect, useRef } from "react";
import ExpandedModal from "./ExpandedModal/ExpandedModal";
import ModalThumbnailList from "./ExpandedModal/ModalThumbnailList";
import ModalContent from "./ExpandedModal/ModalContent";
import useGalleryState from "./useGalleryState";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";
import { StyleSheetManager } from "styled-components";
import PageSection from "../PageSection";
import ArrowIcon from "../Icons/CircleArrow";
import * as S from "./Styles";

interface CarouselGalleryProps {
  images: string[];
  bgcolor?: string;
}

const CarouselGallery: React.FC<CarouselGalleryProps> = ({
  images,
  bgcolor,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const {
    loading,
    selectedMediaIndex,
    modalSelectedImageIndex,
    mediaItems,
    modalVisible,
    modalImageMaxHeight,
    handleGalleryScroll,
    handleGalleryClick,
    openModalAtIndex,
    handleModalThumbnailClick,
    handleModalGalleryScroll,
  } = useGalleryState(images, carouselRef);

  // When selectedMediaIndex changes, scroll the carousel container to the correct image.
  useEffect(() => {
    if (carouselRef.current) {
      // Get the first carousel item to calculate its width and gap.
      const firstItem =
        carouselRef.current.querySelector<HTMLElement>(".snap-center");
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth;
        // Get the gap/margin-right from the computed style (if any).
        const computedStyle = window.getComputedStyle(firstItem);
        const gap = parseFloat(computedStyle.marginRight) || 0;
        const scrollLeft = (itemWidth + gap) * selectedMediaIndex;
        carouselRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [selectedMediaIndex]);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      {modalVisible ? (
        // Modal view remains unchanged.
        <div onClick={(e) => e.stopPropagation()}>
          <ExpandedModal
            toggleShowModal={handleGalleryClick} // used to close the modal
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
        <PageSection className="!pt-0" bgcolor={bgcolor ? bgcolor : ""}>
          <div className="relative w-full">
            {/* Carousel container with horizontal scrolling, snapping, and a gap */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4"
              style={{ scrollBehavior: "smooth" }}
            >
              {mediaItems.map((src, index) => (
                <div
                  key={index}
                  // Responsive widths: full on mobile, half on small, one-third on large.
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-center"
                  onClick={() => openModalAtIndex(index)}
                >
                  {/* Fixed aspect ratio card */}
                  <div className="relative w-full aspect-[4/3]">
                    <img
                      src={src}
                      alt={`Gallery image ${index + 1} of ${mediaItems.length}`}
                      className="object-cover absolute inset-0 w-full h-full cursor-zoom-in"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Left arrow button */}
            {mediaItems.length > 1 && (
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-0 rounded-full">
                <S.ArrowScrollButton
                  className="gallery-button"
                  onClick={() => handleGalleryScroll("left")}
                >
                  <ArrowIcon direction="left" />
                </S.ArrowScrollButton>
              </div>
            )}
            {/* Right arrow button */}
            {mediaItems.length > 1 && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-0 rounded-full">
                <S.ArrowScrollButton
                  className="gallery-button"
                  onClick={() => handleGalleryScroll("right")}
                >
                  <ArrowIcon direction="right" />
                </S.ArrowScrollButton>
              </div>
            )}
          </div>
        </PageSection>
      )}
    </StyleSheetManager>
  );
};

export default CarouselGallery;
