import React, { useState, useEffect, useRef } from 'react';
import * as S from '../Styles';
import DirectionalArrow from '../../Icons/DirectionalArrow';

interface ModalThumbnailListProps {
  images: { url: string }[];
  onThumbnailClick: (index: number) => void;
  videoThumbnail?: string;
  videoIndex: number;
  activeIndex: number;
  id: string;
}

const ModalThumbnailList: React.FC<ModalThumbnailListProps> = ({
  images,
  onThumbnailClick,
  videoThumbnail,
  videoIndex,
  activeIndex,
  id
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
        behavior: 'smooth'
      });
      setTimeout(checkForScrollPosition, 200);
    }
  };

  useEffect(() => {
    checkForScrollPosition();
    window.addEventListener('resize', checkForScrollPosition);

    const handleScroll = () => {
      checkForScrollPosition();
    };

    const currentThumbnailList = thumbnailListRef.current;
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

  const isFmicAssetsImage = (url: string): boolean => {
    return url.includes('www.fmicassets.com');
  };

  const getResizedThumbnailUrl = (url: string): string => {
    if (isFmicAssetsImage(url)) {
      return `https://www.fender.com/cdn-cgi/image/format=png,resize=height=auto,width=100/${url}`;
    } else {
      return `${url}?width=100`;
    }
  };

  return (
    <div id={id}>
      {showLeftArrow && (
        <S.LeftArrowButton className="left-arrow" onClick={() => scrollThumbnails(-1)}>
          <DirectionalArrow direction="left" fill="#1A1B1B" strokeWidth={1.5} width="12" height="7" />
        </S.LeftArrowButton>
      )}
      <S.ThumbnailList isModal className="gallery-modal-thumbnail-list" ref={thumbnailListRef}>
        {images.map((item, index) => {
          const adjustedIndex = index + (index >= videoIndex - 1 && videoThumbnail ? 1 : 0);
          const isActive = adjustedIndex === activeIndex;
          if (index === videoIndex - 1 && videoThumbnail) {
            return (
              <React.Fragment key={item.url}>
                <S.ImageThumbnailContainer
                  isModal
                  className={activeIndex === 0 ? 'activeStyle' : ''}
                  onClick={() => onThumbnailClick(index)}
                >
                  <S.ThumbnailImage
                    isModal
                    src={getResizedThumbnailUrl(item.url)}
                    alt={`Product Thumbnail ${index + 1} of ${images.length}`}
                  />
                </S.ImageThumbnailContainer>
                <S.VideoThumbnailContainer
                  isModal
                  className={activeIndex === videoIndex ? 'activeStyle' : ''}
                  onClick={() => onThumbnailClick(videoIndex)}
                >
                  <S.VideoThumbnail
                    src={getResizedThumbnailUrl(videoThumbnail || '')}
                    isModal
                    alt="Product Video Thumbnail"
                  />
                  <S.PlayIcon
                    src={
                      'https://www.fender.com/cdn-cgi/image/format:png/https://www.fmicassets.com/sites/fender.com/themes/img/play-button.svg'
                    }
                    isModal
                    loading="lazy"
                  />
                </S.VideoThumbnailContainer>
              </React.Fragment>
            );
          } else {
            return (
              <S.ImageThumbnailContainer
                isModal
                key={item.url}
                className={isActive ? 'activeStyle' : ''}
                onClick={() => onThumbnailClick(adjustedIndex)}
              >
                <S.ThumbnailImage
                  alt={`Product Thumbnail ${index + 1} of ${images.length}`}
                  isModal
                  src={getResizedThumbnailUrl(item.url)}
                  loading="lazy"
                />
              </S.ImageThumbnailContainer>
            );
          }
        })}
      </S.ThumbnailList>
      {showRightArrow && (
        <S.RightArrowButton className="right-arrow" onClick={() => scrollThumbnails(1)}>
          <DirectionalArrow direction="right" fill="#1A1B1B" strokeWidth={1.5} width="12" height="7" />
        </S.RightArrowButton>
      )}
    </div>
  );
};

export default ModalThumbnailList;
