import React, { useState, useEffect } from 'react';
import ArrowIcon from '../../Icons/CircleArrow';
import GalleryCarousel from '../Carousel/GalleryCarousel';
import * as S from '../Styles';
import { ScrollModalRightWrapper, ScrollModalLeftWrapper } from './Styles';

interface ImageItem {
  url: string;
  type: string;
}

interface IframeDimensions {
  widthPercentage: number;
  paddingTopPercentage: number;
}

interface ModalContentProps {
  mediaItems: ImageItem[];
  onGalleryScroll: (direction: 'left' | 'right') => void;
  selectedImageIndex: number;
  setSelectedIndex: (index: number) => void;
  videoIndex: number;
  videoThumbnail?: string;
  modalImageMaxHeight: number;
  iframeDimensions: IframeDimensions;
}

interface TouchPosition {
  x: number;
  y: number;
}

interface TransformOrigin {
  x: number;
  y: number;
}

interface ZoomProperties {
  [key: number]: {
    nonZoomable: boolean;
    zoomRate: number;
    mobileZoomRate: number;
  };
}

const ModalContent: React.FC<ModalContentProps> = ({
  mediaItems,
  onGalleryScroll,
  selectedImageIndex,
  setSelectedIndex,
  videoIndex,
  videoThumbnail,
  modalImageMaxHeight,
  iframeDimensions,
}) => {
  const [initialTouchTime, setInitialTouchTime] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [zoomedImage, setZoomedImage] = useState<HTMLImageElement | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [lastTouchPosition, setLastTouchPosition] = useState<TouchPosition>({
    x: 0,
    y: 0,
  });
  const [lastTransformOrigin, setLastTransformOrigin] =
    useState<TransformOrigin>({ x: 50, y: 50 });
  const [zoomProperties, setZoomProperties] = useState<ZoomProperties>({});
  const [tappedTwice, setTappedTwice] = useState<boolean>(false);

  const updateZoomProperties = (img: HTMLImageElement, index: number) => {
    const containerWidth = img.clientWidth;
    const naturalWidth = img.naturalWidth;

    const maxZoomRate = naturalWidth / containerWidth;
    const nonZoomable = maxZoomRate <= 1.15;
    const zoomRate = nonZoomable ? 1 : Math.min(maxZoomRate, 2.5);
    const mobileZoomRate = Math.min(maxZoomRate, 4.5);

    setZoomProperties((prev) => ({
      ...prev,
      [index]: { nonZoomable, zoomRate, mobileZoomRate },
    }));
  };

  const updateTransformOrigin = (e: MouseEvent): void => {
    if (zoomedImage && isZoomed && !e.type.startsWith('touch')) {
      const clientX = e.clientX;
      const clientY = e.clientY;

      const rect = zoomedImage.getBoundingClientRect();
      let x = ((clientX - rect.left) / rect.width) * 100;
      x = Math.min(100, Math.max(0, x));
      let y = ((clientY - rect.top) / rect.height) * 100;
      y = Math.min(100, Math.max(0, y));
      zoomedImage.style.transformOrigin = `${x}% ${y}%`;
    }
  };

  const handleTouchStart = (e: TouchEvent): void => {
    e.preventDefault();
    setInitialTouchTime(Date.now());
    if (isZoomed) {
      const touch = e.touches[0];
      setLastTouchPosition({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchMove = (e: TouchEvent): void => {
    if (zoomedImage && isZoomed) {
      setIsSwiping(true);
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastTouchPosition.x;
      const deltaY = touch.clientY - lastTouchPosition.y;

      let newTransformOriginX =
        lastTransformOrigin.x - (deltaX / zoomedImage.clientWidth) * 100;
      newTransformOriginX = Math.min(100, Math.max(0, newTransformOriginX));
      let newTransformOriginY =
        lastTransformOrigin.y - (deltaY / zoomedImage.clientHeight) * 100;
      newTransformOriginY = Math.min(100, Math.max(0, newTransformOriginY));

      zoomedImage.style.transformOrigin = `${newTransformOriginX}% ${newTransformOriginY}%`;

      setLastTouchPosition({ x: touch.clientX, y: touch.clientY });
      setLastTransformOrigin({
        x: newTransformOriginX,
        y: newTransformOriginY,
      });
    }
  };

  const handleTouchEnd = (e: TouchEvent): void => {
    const touchDuration = Date.now() - initialTouchTime;
    if (isZoomed && !isSwiping && touchDuration < 300) {
      if (zoomedImage && zoomedImage.classList.contains('zoomed')) {
        zoomedImage.classList.remove('zoomed');
        setIsZoomed(false);
        zoomedImage.style.transformOrigin = 'center center';
      }
    }
    setIsSwiping(false);
  };

  const resetZoomState = () => {
    if (zoomedImage && zoomedImage.classList.contains('zoomed')) {
      zoomedImage.classList.remove('zoomed');
      zoomedImage.style.transformOrigin = 'center center';
    }
    setIsZoomed(false);
    setZoomedImage(null);
  };

  useEffect(() => {
    if (isZoomed) {
      window.addEventListener('touchstart', handleTouchStart, {
        passive: false,
      });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd, { passive: false });
      window.addEventListener('mousemove', updateTransformOrigin);
    }
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousemove', updateTransformOrigin);
    };
  }, [isZoomed, zoomedImage, lastTouchPosition, lastTransformOrigin]);

  useEffect(() => {
    resetZoomState();
  }, [selectedImageIndex]);

  useEffect(() => {
    const handleResize = () => {
      recalculateZoomPropertiesForAllImages();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mediaItems]);

  const recalculateZoomPropertiesForAllImages = () => {
    mediaItems.forEach((item, index) => {
      const imgElement = document.querySelector(`#modal-hero-image-${index}`);
      if (imgElement) {
        updateZoomProperties(imgElement as HTMLImageElement, index);
      }
    });
  };

  const isMobileDevice = () => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0
    );
  };

  let lastTap = 0;

  const handleImageTap = (
    event: React.TouchEvent<HTMLImageElement>,
    index: number
  ) => {
    event.preventDefault();
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      // Double Tap

      // Calculate the touch position relative to the image
      const touch = event.changedTouches[0];
      const img = event.currentTarget;
      const rect = img.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;

      // Set the transform-origin based on the touch position
      img.style.transformOrigin = `${x}% ${y}%`;

      handleImageClick(event, index);
    }
    lastTap = currentTime;
  };

  const handleImageClick = (event: any, index: any) => {
    const zoomProp = zoomProperties[index];
    const isNonZoomable = zoomProp ? zoomProp.nonZoomable : false;

    if (!isNonZoomable) {
      const img = event.currentTarget;
      if (!img.classList.contains('zoomed')) {
        setZoomedImage(img);
        setIsZoomed(true);
        const rect = img.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        img.style.transformOrigin = `${x}% ${y}%`;
      } else {
        setIsZoomed(false);
      }
      img.classList.toggle('zoomed');
    }
  };

  const renderCarouselItem = (item: ImageItem, index: number) => {
    switch (item.type) {
      case 'threeSixtyProductView':
        return null;
      case 'video':
        return (
          <S.IframeWrapper
            key={item.url}
            widthPercentage={iframeDimensions.widthPercentage}
            paddingTopPercentage={iframeDimensions.paddingTopPercentage}
          >
            <S.StyledIframe
              key={
                selectedImageIndex === videoIndex
                  ? item.url
                  : 'video-placeholder'
              }
              tabIndex={-1}
              allowFullScreen
              src={selectedImageIndex === videoIndex ? item.url : ''}
            />
            <S.IframeThumbnailWrapper>
              <S.IframeThumbnailDesktop />
              <S.IframeThumbnailMobile
                src={`https://www.fender.com/cdn-cgi/image/format=png,resize=height=auto,width=600/${videoThumbnail}`}
                alt="Product Video YouTube Thumbnail"
              />
            </S.IframeThumbnailWrapper>
          </S.IframeWrapper>
        );
      case 'image':
      default:
        const zoomProp = zoomProperties[index];
        const isNonZoomable = zoomProp ? zoomProp.nonZoomable : false;
        const zoomRate = zoomProp ? zoomProp.zoomRate : 1;
        const mobileZoomRate = zoomProp ? zoomProp.mobileZoomRate : 1.5;

        return (
          <S.HeroImage
            id={`modal-hero-image-${index}`}
            isModal
            onLoad={(e: { target: any }) =>
              updateZoomProperties(e.target, index)
            }
            key={item.url}
            src={`${item.url}`}
            alt={`Gallery image ${index + 1} of ${mediaItems.length}`}
            className={`${
              isNonZoomable ? 'non-zoomable' : ''
            } modal-hero-image`}
            onClick={
              !isMobileDevice()
                ? (e: any) => handleImageClick(e, index)
                : undefined
            }
            onTouchEnd={(e: any) => handleImageTap(e, index)}
            zoomRate={zoomRate}
            mobileZoomRate={mobileZoomRate}
          />
        );
    }
  };

  const carouselItems = mediaItems.map((item, index) =>
    renderCarouselItem(item, index)
  );

  return (
    <S.CarouselItemsContainer modalImageMaxHeight={modalImageMaxHeight}>
      <ScrollModalLeftWrapper>
        <S.ArrowScrollButton
          className="gallery-button"
          tabIndex={-1}
          onClick={() => onGalleryScroll('left')}
        >
          <ArrowIcon direction={'left'} />
        </S.ArrowScrollButton>
      </ScrollModalLeftWrapper>
      <S.GalleryMainContent isModal>
        <GalleryCarousel
          isZoomed={isZoomed}
          selectedIndex={selectedImageIndex}
          setSelectedIndex={setSelectedIndex}
          toggleShowModal={null}
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
          <ArrowIcon direction={'right'} />
        </S.ArrowScrollButton>
      </ScrollModalRightWrapper>
    </S.CarouselItemsContainer>
  );
};

export default ModalContent;
