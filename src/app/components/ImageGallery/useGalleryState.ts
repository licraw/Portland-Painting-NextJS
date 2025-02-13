"use client";
import { useState, useEffect, RefObject } from "react";

const useGalleryState = (
  images: string[], // An array of image URLs
  thumbnailListRef: RefObject<HTMLDivElement>
) => {
  const [loading, setLoading] = useState(true);
  const [mediaItems, setMediaItems] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalSelectedImageIndex, setModalSelectedImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // Track modal max height (for layout purposes)
  const [modalImageMaxHeight, setModalImageMaxHeight] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  const [showUpArrow, setShowUpArrow] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState(true);

  // Initialize gallery with provided images.
  useEffect(() => {
    setMediaItems(images);
    setLoading(false);
  }, [images]);

  // Update modal max height on window resize.
  const handleResize = () => {
    if (typeof window !== "undefined") {
      const thumbnailHeight = thumbnailListRef.current ? thumbnailListRef.current.offsetHeight : 0;
      let availableHeight = window.innerHeight - thumbnailHeight - 200;
      availableHeight = Math.max(availableHeight, 20);
      setModalImageMaxHeight(availableHeight);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [modalVisible]);

  // Toggle modal visibility.
  // For the carousel view: when opening, sync the modal's selected index.
  const handleGalleryClick = () => {
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      setModalSelectedImageIndex(selectedImageIndex);
    }
  };

  // NEW: Open modal at a given index.
  // This function is used in the masonry view so that clicking an image
  // sets the active index and opens the modal.
  const openModalAtIndex = (index: number) => {
    setSelectedImageIndex(index);
    setModalSelectedImageIndex(index);
    setModalVisible(true);
  };

  // Navigation for main gallery.
  const handleGalleryScroll = (direction: "left" | "right") => {
    let newIndex = selectedImageIndex;
    if (direction === "left") {
      newIndex = (selectedImageIndex - 1 + mediaItems.length) % mediaItems.length;
    } else if (direction === "right") {
      newIndex = (selectedImageIndex + 1) % mediaItems.length;
    }
    setSelectedImageIndex(newIndex);
  };

  // Navigation for modal.
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

  const handleModalThumbnailClick = (index: number) => {
    setModalSelectedImageIndex(index);
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Check scroll position of thumbnail list.
  const checkForScrollPosition = () => {
    if (thumbnailListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = thumbnailListRef.current;
      setShowUpArrow(scrollTop > 0);
      setShowDownArrow(scrollTop < scrollHeight - clientHeight);
    }
  };

  // Scroll the thumbnail list.
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

  useEffect(() => {
    if (!thumbnailListRef.current) return;
    checkForScrollPosition();
    window.addEventListener("resize", checkForScrollPosition);
    const currentThumbnailList = thumbnailListRef.current;
    const handleScroll = () => checkForScrollPosition();
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

  return {
    loading,
    selectedMediaIndex: selectedImageIndex,
    modalSelectedImageIndex,
    mediaItems,
    modalVisible,
    modalImageMaxHeight,
    showUpArrow,
    showDownArrow,
    handleThumbnailClick,
    handleGalleryScroll,
    handleThumbnailScroll,
    handleGalleryClick,
    handleModalThumbnailClick,
    handleModalGalleryScroll,
    openModalAtIndex, // <-- new method returned here
  };
};

export default useGalleryState;
