"use client";
import React, { useRef } from "react";
import ThumbnailList from "./ThumbnailList";
import GalleryContent from "./GalleryContent";
import ExpandedModal from "./ExpandedModal/ExpandedModal";
import {
  GalleryContainer,
  ScrollThumbsDownButton,
  ScrollThumbsUpButton,
  ModalContainer,
} from "./Styles";
import ModalThumbnailList from "./ExpandedModal/ModalThumbnailList";
import ModalContent from "./ExpandedModal/ModalContent";
import useGalleryState from "./useGalleryState";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";
import DirectionalArrow from "../Icons/DirectionalArrow";
import { StyleSheetManager } from "styled-components";

interface GalleryProps {
  images: string[];
}

const ImageGallery: React.FC<GalleryProps> = ({ images }) => {
  const thumbnailListRef = useRef<HTMLDivElement>(null);

  const shouldForwardProp = (prop: string): boolean =>
    ![
      "paddingTopPercentage",
      "widthPercentage",
      "modalImageMaxHeight",
      "mobileMaxHeight",
      "isModal",
      "mobileDisplay",
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
    showUpArrow,
    showDownArrow,
    handleThumbnailClick,
    handleGalleryScroll,
    handleThumbnailScroll,
    handleGalleryClick,
    handleModalThumbnailClick,
    handleModalGalleryScroll,
  } = useGalleryState(images, thumbnailListRef);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      {modalVisible ? (
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ExpandedModal toggleShowModal={handleGalleryClick} modalVisible={modalVisible}>
            <ModalContent
              onGalleryScroll={handleModalGalleryScroll}
              mediaItems={mediaItems.map(url => ({ url }))}
              selectedImageIndex={modalSelectedImageIndex}
              setSelectedIndex={handleModalThumbnailClick}
            />
          </ExpandedModal>
          <ModalThumbnailList
            images={mediaItems}
            onThumbnailClick={handleModalThumbnailClick}
            activeIndex={modalSelectedImageIndex}
            id="image-gallery-modal-thumblist"
          />
        </ModalContainer>
      ) : (
        <div style={{ position: "relative", maxWidth: "850px", margin: "0 auto" }}>
          <GalleryContainer onClick={(e) => e.stopPropagation()}>
            <ThumbnailList
              mediaItems={mediaItems}
              ref={thumbnailListRef}
              onThumbnailClick={handleThumbnailClick}
              activeIndex={selectedMediaIndex}
              mediaItemsLength={mediaItems.length}
            />
            <GalleryContent
              onGalleryScroll={handleGalleryScroll}
              mediaItems={mediaItems}
              selectedImageIndex={selectedMediaIndex}
              toggleShowModal={handleGalleryClick}
              setSelectedIndex={handleThumbnailClick}
            />
            {showUpArrow && mediaItems.length > 5 && (
              <ScrollThumbsUpButton
                className="gallery-button"
                onClick={() => handleThumbnailScroll(-1)}
              >
                <DirectionalArrow direction="up" fill="#1A1B1B" strokeWidth={1.5} width="12" height="7" />
              </ScrollThumbsUpButton>
            )}
            {showDownArrow && mediaItems.length > 5 && (
              <ScrollThumbsDownButton
                className="gallery-button"
                onClick={() => handleThumbnailScroll(1)}
              >
                <DirectionalArrow direction="down" fill="#1A1B1B" strokeWidth={1.5} width="12" height="7" />
              </ScrollThumbsDownButton>
            )}
          </GalleryContainer>
        </div>
      )}
    </StyleSheetManager>
  );
};

export default ImageGallery;
