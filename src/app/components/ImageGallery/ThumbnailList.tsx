"use client";
import React, { forwardRef } from 'react';
import * as S from './Styles';

interface ThumbnailListProps {
  mediaItems: string[]; // An array of image URLs
  onThumbnailClick: (index: number) => void;
  activeIndex: number;
  mediaItemsLength: number;
}

const ThumbnailList = forwardRef<HTMLDivElement, ThumbnailListProps>(
  ({ mediaItems, onThumbnailClick, activeIndex, mediaItemsLength }, ref) => {
    // Process the URLs into objects with index info.
    const itemList = mediaItems.map((url, index) => ({
      url,
      originalIndex: index,
      displayIndex: index,
    }));

    return (
      <S.ThumbnailList ref={ref} mediaItemsLength={mediaItemsLength}>
        {itemList.map((item) => {
          const isActive = item.displayIndex === activeIndex;
          return (
            <S.ImageThumbnailContainer
              tabIndex={0}
              key={`thumbnail-${item.originalIndex}`}
              className={isActive ? 'activeStyle' : ''}
              onClick={() => onThumbnailClick(item.displayIndex)}
              onKeyDown={(e: { key: string }) =>
                e.key === 'Enter' && onThumbnailClick(item.displayIndex)
              }
            >
              <S.ThumbnailImage
                src={item.url}
                alt={`Thumbnail ${item.originalIndex + 1} of ${mediaItems.length}`}
              />
            </S.ImageThumbnailContainer>
          );
        })}
      </S.ThumbnailList>
    );
  }
);

ThumbnailList.displayName = 'ThumbnailList';

export default ThumbnailList;
