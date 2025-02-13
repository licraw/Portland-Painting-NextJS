"use client";
import React, { useState, useEffect, RefObject } from "react";

interface IframeDimensions {
  widthPercentage: number;
  paddingTopPercentage: number;
}

const useGalleryState = (
  images: string[], // Changed from MediaItem[] to string[]
  thumbnailListRef: RefObject<HTMLDivElement>
) => {
  const [loading, setLoading] = useState(true);
  const [mediaItems, setMediaItems] = useState<string[]>([]); // Now an array of strings
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalSelectedImageIndex, setModalSelectedImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // Lazy initialization to avoid SSR issues:
  const [modalImageMaxHeight, setModalImageMaxHeight] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  // Keep the same dimensions logic for compatibility with the current modal layout.
  const [iframeDimensions, setIframeDimensions] = useState<IframeDimensions>({
    widthPercentage: 100,
    paddingTopPercentage: 56.25,
  });

  const [showUpArrow, setShowUpArrow] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState(true);

  // Initialize gallery with the provided images.
  useEffect(() => {
    setMediaItems(images);
    setLoading(false);
  }, [images]);

  // Update the modal dimensions on mount and whenever modalImageMaxHeight changes.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const containerWidth = window.innerWidth;
      const newDimensions = calculateIframeDimensions(containerWidth, modalImageMaxHeight);
      setIframeDimensions(newDimensions);
    }
  }, [modalImageMaxHeight]);

  const calculateIframeDimensions = (
    containerWidth: number,
    modalImageMaxHeight: number
  ): IframeDimensions => {
    let calculatedWidth = modalImageMaxHeight * (16 / 9);
    let widthPercentage = (calculatedWidth / containerWidth) * 100;
    widthPercentage = Math.min(widthPercentage, 100);

    let paddingTopPercentage;
    if (widthPercentage < 26.16) {
      widthPercentage = 26.15;
      paddingTopPercentage = 14.71;
    } else {
      const originalPaddingTop = 56.25;
      paddingTopPercentage = originalPaddingTop * (widthPercentage / 100);
    }
    return { widthPercentage, paddingTopPercentage };
  };

  // Toggle modal visibility. When opening, sync the modal's selected index with the current gallery index.
  const handleGalleryClick = () => {
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      setModalSelectedImageIndex(selectedImageIndex);
    }
  };

  // Gallery navigation (left/right) for the main gallery view.
  const handleGalleryScroll = (direction: "left" | "right") => {
    let newIndex = selectedImageIndex;
    if (direction === "left") {
      newIndex = (selectedImageIndex - 1 + mediaItems.length) % mediaItems.length;
    } else if (direction === "right") {
      newIndex = (selectedImageIndex + 1) % mediaItems.length;
    }
    setSelectedImageIndex(newIndex);
  };

  // Modal navigation (left/right) for when the modal is open.
  const handleModalGalleryScroll = (direction: "left" | "right") => {
    let newIndex = modalSelectedImageIndex;
    const totalItems = mediaItems.length;
    if (direction === "left") {
      newIndex = (modalSelectedImageIndex - 1 + totalItems) % totalItems;
    } else if (direction === "right") {
      newIndex = (modalSelectedImageIndex + 1) % totalItems;
    }
    setModalSelectedImageIndex(newIndex);
  };

  // Set the modal's selected image when a thumbnail is clicked in the modal.
  const handleModalThumbnailClick = (index: number) => {
    setModalSelectedImageIndex(index);
  };

  // Set the gallery's selected image when a thumbnail is clicked.
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Check the scroll position of the thumbnail list to determine if up/down arrows should be shown.
  const checkForScrollPosition = () => {
    if (thumbnailListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = thumbnailListRef.current;
      setShowUpArrow(scrollTop > 0);
      setShowDownArrow(scrollTop < scrollHeight - clientHeight);
    }
  };

  // Scroll the thumbnail list by a fraction of its height.
  const handleThumbnailScroll = (direction: number) => {
    if (thumbnailListRef.current) {
      const { clientHeight } = thumbnailListRef.current;
      thumbnailListRef.current.scrollBy({
        top: (direction * clientHeight) / 3,
        behavior: "smooth",
      });
      setTimeout(checkForScrollPosition, 200);
    }
  };

  // Attach scroll and resize listeners for the thumbnail list.
  useEffect(() => {
    if (!thumbnailListRef.current) return;
    checkForScrollPosition();
    window.addEventListener("resize", checkForScrollPosition);

    const handleScroll = () => {
      checkForScrollPosition();
    };

    const currentThumbnailList = thumbnailListRef.current;
    if (currentThumbnailList) {
      currentThumbnailList.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", checkForScrollPosition);
      if (currentThumbnailList) {
        currentThumbnailList.removeEventListener("scroll", handleScroll);
      }
    };
  }, [thumbnailListRef.current]);

  // Update modal image max height and modal dimensions on window resize.
  const handleResize = () => {
    if (typeof window !== "undefined") {
      const newWidth = window.innerWidth;
      const thumbnailHeight = thumbnailListRef.current ? thumbnailListRef.current.offsetHeight : 0;
      let availableHeight = window.innerHeight - thumbnailHeight - 200;
      availableHeight = Math.max(availableHeight, 20);

      setModalImageMaxHeight(availableHeight);
      const newDimensions = calculateIframeDimensions(newWidth, availableHeight);
      setIframeDimensions(newDimensions);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [modalVisible]);

  return {
    loading,
    selectedMediaIndex: selectedImageIndex,
    modalSelectedImageIndex,
    mediaItems,
    modalVisible,
    modalImageMaxHeight,
    iframeDimensions,
    showUpArrow,
    showDownArrow,
    handleThumbnailClick,
    handleGalleryScroll,
    handleThumbnailScroll,
    handleGalleryClick,
    handleModalThumbnailClick,
    handleModalGalleryScroll,
  };
};

export default useGalleryState;
