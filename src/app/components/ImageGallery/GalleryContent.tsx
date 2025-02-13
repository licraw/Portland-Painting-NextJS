"use client";
import React, { useEffect, useState, useRef } from 'react';
import ArrowIcon from '../Icons/CircleArrow';
import GalleryCarousel from './Carousel/GalleryCarousel.jsx';
import * as S from './Styles';

interface GalleryContentProps {
  // Now a simple array of image URLs.
  mediaItems: string[];
  onGalleryScroll: (direction: 'left' | 'right') => void;
  selectedImageIndex: number;
  toggleShowModal: () => void;
  setSelectedIndex: (index: number) => void;
}

const GalleryContent: React.FC<GalleryContentProps> = ({
  mediaItems,
  onGalleryScroll,
  selectedImageIndex,
  toggleShowModal,
  setSelectedIndex,
}) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const galleryElement = galleryRef.current;
    if (galleryElement) {
      const handleMouseEnter = () => setShowScrollButtons(true);
      const handleMouseLeave = () => setShowScrollButtons(false);

      galleryElement.addEventListener('mouseenter', handleMouseEnter);
      galleryElement.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        galleryElement.removeEventListener('mouseenter', handleMouseEnter);
        galleryElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  // Returns the srcSet for the image. In this simple case, it's just the URL.
  const getImageSrcSet = (baseImageUrl: string): string => {
    return baseImageUrl;
  };

  // Append a query parameter for width if the URL exists; otherwise, return null.
  const getDefaultImageUrl = (baseImageUrl: string): string | null => {
    return baseImageUrl ? `${baseImageUrl}?width=850` : null;
  };

  const renderCarouselItem = (item: string, index: number) => {
    const imageSrcSet = getImageSrcSet(item);
    const defaultImageUrl = getDefaultImageUrl(item);
    if (!defaultImageUrl) return null; // Do not render if URL is missing.
    return (
      <S.HeroImage
        mobileMaxHeight={undefined}
        id={`image-${index}`}
        key={`hero-image-${index}-${item}`}
        src={defaultImageUrl}
        srcSet={imageSrcSet}
        alt={`Gallery image ${index + 1} of ${mediaItems.length}`}
      />
    );
  };

  const carouselItems = mediaItems.map((item, index) => renderCarouselItem(item, index));

  return (
    <S.GalleryMainContent isModal={false} ref={galleryRef}>
      <GalleryCarousel
        toggleShowModal={toggleShowModal}
        selectedIndex={selectedImageIndex}
        setSelectedIndex={setSelectedIndex}
        isZoomed={false}
      >
        {carouselItems}
      </GalleryCarousel>
      {mediaItems.length > 1 && showScrollButtons && (
        <>
          <S.LeftScrollButtonWrapper>
            <S.ArrowScrollButton
              className="gallery-button"
              tabIndex={-1}
              onClick={() => onGalleryScroll('left')}
            >
              <ArrowIcon direction="left" />
            </S.ArrowScrollButton>
          </S.LeftScrollButtonWrapper>
          <S.RightScrollButtonWrapper>
            <S.ArrowScrollButton
              className="gallery-button"
              tabIndex={-1}
              onClick={() => onGalleryScroll('right')}
            >
              <ArrowIcon direction="right" />
            </S.ArrowScrollButton>
          </S.RightScrollButtonWrapper>
        </>
      )}
    </S.GalleryMainContent>
  );
};

export default GalleryContent;
