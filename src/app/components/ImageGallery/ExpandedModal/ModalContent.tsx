"use client";
import React from 'react';
import ArrowIcon from '../../Icons/CircleArrow';
import GalleryCarousel from '../Carousel/GalleryCarousel';
import * as S from '../Styles';
import { ScrollModalRightWrapper, ScrollModalLeftWrapper } from './Styles';

interface ModalContentProps {
  mediaItems: { url: string }[]; // Array of image objects
  onGalleryScroll: (direction: 'left' | 'right') => void;
  selectedImageIndex: number;
  setSelectedIndex: (index: number) => void;
}

const ModalContent: React.FC<ModalContentProps> = ({
  mediaItems,
  onGalleryScroll,
  selectedImageIndex,
  setSelectedIndex,
}) => {
  const renderCarouselItem = (item: { url: string }, index: number) => {
    return (
      <S.HeroImage
        id={`modal-hero-image-${index}`}
        key={`modal-hero-image-${index}`}
        src={item.url}
        alt={`Gallery image ${index + 1} of ${mediaItems.length}`}
        onClick={() => setSelectedIndex(index)}
      />
    );
  };

  const carouselItems = mediaItems.map((item, index) =>
    renderCarouselItem(item, index)
  );

  return (
    <S.CarouselItemsContainer>
      <ScrollModalLeftWrapper>
        <S.ArrowScrollButton
          className="gallery-button"
          tabIndex={-1}
          onClick={() => onGalleryScroll('left')}
        >
          <ArrowIcon direction="left" />
        </S.ArrowScrollButton>
      </ScrollModalLeftWrapper>
      <S.GalleryMainContent isModal>
        <GalleryCarousel
          toggleShowModal={() => {}}  // Dummy function
          isZoomed={false}            // Default value
          selectedIndex={selectedImageIndex}
          setSelectedIndex={setSelectedIndex}
        >
          {carouselItems}
        </GalleryCarousel>
      </S.GalleryMainContent>
      <ScrollModalRightWrapper>
        <S.ArrowScrollButton
          className="gallery-button"
          tabIndex={-1}
          onClick={() => onGalleryScroll('right')}
        >
          <ArrowIcon direction="right" />
        </S.ArrowScrollButton>
      </ScrollModalRightWrapper>
    </S.CarouselItemsContainer>
  );
};

export default ModalContent;
