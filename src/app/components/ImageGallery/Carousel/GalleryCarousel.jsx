import React, { useState, useEffect, useRef } from 'react';
import CarouselItem from './CarouselItem.jsx';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  overflow: hidden;
  width: 100%;
  padding-top: 66.67%;
  height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: pan-y pinch-zoom;
`;

const CarouselInner = styled.div`
  will-change: transform;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  transition: ${(props) =>
    props.dragging ? 'none' : 'transform 0.2s ease-in-out'};
  mix-blend-mode: darken;
  width: 100%;
  height: 100%;
`;

const GalleryCarousel = ({
  children,
  selectedIndex,
  toggleShowModal,
  setSelectedIndex,
  isZoomed,
}) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const carouselInnerRef = useRef(null);

  useEffect(() => {
    const carouselInner = carouselInnerRef.current;

    const handleTouchStart = (e) => {
      if (isZoomed) return;
      setStartX(e.touches[0].clientX);
      setStartY(e.touches[0].clientY);
      setIsScrolling(false);
      setDragging(true);
      setDragOffset(0);
    };

    const handleTouchMove = (e) => {
      if (!dragging || isZoomed) return;

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;

      const moveX = touchX - startX;
      const moveY = touchY - startY;

      // Check for vertical scrolling vs horizontal swiping
      if (Math.abs(moveY) > Math.abs(moveX)) {
        setIsScrolling(true);
      } else {
        e.preventDefault();
        if (!isScrolling) {
          setDragOffset(moveX);
        }
      }
    };

    const handleTouchEnd = (e) => {
      if (isZoomed || !dragging) return;
      setDragging(false);

      const endX = e.changedTouches[0].clientX;
      const moveX = endX - startX;

      const endTime = Date.now();
      const startTime = endTime - e.timeStamp;
      const duration = endTime - startTime;

      const tapThreshold = 10;
      const timeThreshold = 200;

      if (Math.abs(moveX) < tapThreshold && duration < timeThreshold) {
        // It's a tap
        if (toggleShowModal) toggleShowModal();
      } else {
        // It's a swipe
        const threshold = window.innerWidth * 0.3;
        const totalItems = React.Children.count(children);

        if (Math.abs(moveX) > threshold) {
          if (moveX > 0) {
            setSelectedIndex(
              selectedIndex > 0 ? selectedIndex - 1 : totalItems - 1
            );
          } else {
            setSelectedIndex(
              selectedIndex < totalItems - 1 ? selectedIndex + 1 : 0
            );
          }
        }
      }

      setDragOffset(0);
      setIsScrolling(false);
    };

    carouselInner.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
    carouselInner.addEventListener('touchend', handleTouchEnd, {
      passive: false,
    });
     carouselInner.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });

    return () => {
      if (carouselInner) {
        carouselInner.removeEventListener('touchstart', handleTouchStart);
        carouselInner.removeEventListener('touchmove', handleTouchMove);
        carouselInner.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [dragging, isZoomed, startX, startY, isScrolling]);

  const transform = `translate3d(${
    -selectedIndex * 100 + (dragOffset / window.innerWidth) * 100
  }%, 0, 0)`;

  return (
    <CarouselContainer onClick={toggleShowModal}>
      <CarouselInner
        ref={carouselInnerRef}
        style={{ transform }}
        dragging={dragging ? 1 : 0}
      >
        {React.Children.map(children, (child, index) => (
          <CarouselItem key={index}>{child}</CarouselItem>
        ))}
      </CarouselInner>
    </CarouselContainer>
  );
};

export default GalleryCarousel;
