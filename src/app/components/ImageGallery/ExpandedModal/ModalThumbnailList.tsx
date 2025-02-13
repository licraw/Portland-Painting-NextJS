"use client";
import React, { useState, useEffect, useRef } from 'react';
import * as S from '../Styles';
import DirectionalArrow from '../../Icons/CircleArrow';

interface ModalThumbnailListProps {
  images: string[]; // An array of image URLs
  onThumbnailClick: (index: number) => void;
  activeIndex: number;
  id: string;
}

const ModalThumbnailList: React.FC<ModalThumbnailListProps> = ({
  images,
  onThumbnailClick,
  activeIndex,
  id,
}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const thumbnailListRef = useRef<HTMLDivElement>(null);

  const checkForScrollPosition = () => {
    if (thumbnailListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = thumbnailListRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollThumbnails = (direction: number) => {
    if (thumbnailListRef.current) {
      const { clientWidth } = thumbnailListRef.current;
      thumbnailListRef.current.scrollBy({
        left: (direction * clientWidth) / 2,
        behavior: 'smooth',
      });
      setTimeout(checkForScrollPosition, 200);
    }
  };

  useEffect(() => {
    checkForScrollPosition();
    window.addEventListener('resize', checkForScrollPosition);
    const currentThumbnailList = thumbnailListRef.current;
    const handleScroll = () => checkForScrollPosition();
    if (currentThumbnailList) {
      currentThumbnailList.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('resize', checkForScrollPosition);
      if (currentThumbnailList) {
        currentThumbnailList.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // No extra resizing – simply use the URL.
  const getResizedThumbnailUrl = (url: string): string => {
    return url;
  };

  return (
    <div id={id}>
      {showLeftArrow && (
        <S.LeftArrowButton className="left-arrow" onClick={() => scrollThumbnails(-1)}>
          <DirectionalArrow direction="left" />
        </S.LeftArrowButton>
      )}
      <S.ThumbnailList isModal className="gallery-modal-thumbnail-list" ref={thumbnailListRef}>
        {images.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <S.ImageThumbnailContainer
              isModal
              key={`thumbnail-${index}`}
              className={isActive ? 'activeStyle' : ''}
              onClick={() => onThumbnailClick(index)}
              onKeyDown={(e: { key: string }) =>
                e.key === 'Enter' && onThumbnailClick(index)
              }
              tabIndex={0}
            >
              <S.ThumbnailImage
                isModal
                src={getResizedThumbnailUrl(item)}
                alt={`Thumbnail ${index + 1} of ${images.length}`}
                loading="lazy"
              />
            </S.ImageThumbnailContainer>
          );
        })}
      </S.ThumbnailList>
      {showRightArrow && (
        <S.RightArrowButton className="right-arrow" onClick={() => scrollThumbnails(1)}>
          <DirectionalArrow direction="right" />
        </S.RightArrowButton>
      )}
    </div>
  );
};

export default ModalThumbnailList;
