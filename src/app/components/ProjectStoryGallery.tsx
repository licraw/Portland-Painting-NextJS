"use client";

import type { ProjectStoryImage } from "@/types/supabase";
import { useEffect, useRef, useState } from "react";

export type ProjectStoryDisplayImage = ProjectStoryImage & {
  publicUrl: string;
};

type ProjectStoryGalleryProps = {
  images: ProjectStoryDisplayImage[];
};

export default function ProjectStoryGallery({
  images,
}: ProjectStoryGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const selectedImage = images[selectedIndex];

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === 0 ? images.length - 1 : current - 1
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) => (current + 1) % images.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      openButtonRef.current?.focus();
    };
  }, [images.length, isOpen]);

  if (!selectedImage) return null;

  function showPrevious() {
    setSelectedIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  }

  function showNext() {
    setSelectedIndex((current) => (current + 1) % images.length);
  }

  return (
    <section
      aria-label="Project photo gallery"
      className="border-b border-[#20231F]/15 py-8"
    >
      <figure>
        <button
          aria-label={`Open photo ${selectedIndex + 1} of ${images.length}: ${selectedImage.alt_text}`}
          className="block w-full cursor-zoom-in bg-[#E5DFD3] text-left focus:outline-none focus:ring-2 focus:ring-[#17352B] focus:ring-offset-4 focus:ring-offset-[#F2EEE5]"
          onClick={() => setIsOpen(true)}
          ref={openButtonRef}
          type="button"
        >
          <span className="block aspect-[16/9] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={selectedImage.alt_text}
              className="h-full w-full object-cover"
              height={selectedImage.height ?? 900}
              loading="eager"
              src={selectedImage.publicUrl}
              width={selectedImage.width ?? 1200}
            />
          </span>
        </button>
        <figcaption className="mt-3 flex items-start justify-between gap-4 text-sm leading-5 text-[#20231F]/60">
          <span>{selectedImage.caption ?? selectedImage.alt_text}</span>
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em]">
            {selectedIndex + 1} / {images.length}
          </span>
        </figcaption>
      </figure>

      {images.length > 1 ? (
        <div
          aria-label="Choose a project photo"
          className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4"
          role="group"
        >
          {images.map((image, index) => (
            <button
              aria-label={`Show photo ${index + 1}: ${image.alt_text}`}
              aria-pressed={index === selectedIndex}
              className={`aspect-[4/3] overflow-hidden border-2 bg-[#E5DFD3] focus:outline-none focus:ring-2 focus:ring-[#17352B] focus:ring-offset-2 focus:ring-offset-[#F2EEE5] ${
                index === selectedIndex
                  ? "border-[#17352B]"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              type="button"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="h-full w-full object-cover"
                height={image.height ?? 300}
                loading="lazy"
                src={image.publicUrl}
                width={image.width ?? 400}
              />
            </button>
          ))}
        </div>
      ) : null}

      {isOpen ? (
        <div
          aria-labelledby="project-gallery-dialog-title"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex flex-col bg-[#111713]/95 p-4 text-white sm:p-6"
          onClick={() => setIsOpen(false)}
          role="dialog"
        >
          <h2 className="sr-only" id="project-gallery-dialog-title">
            Project photo viewer
          </h2>
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/70">
              Photo {selectedIndex + 1} of {images.length}
            </p>
            <button
              className="border border-white/50 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-[#17352B] focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setIsOpen(false)}
              ref={closeButtonRef}
              type="button"
            >
              Close
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 flex-col items-center justify-center py-5"
            onClick={(event) => event.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={selectedImage.alt_text}
              className="min-h-0 max-h-full max-w-full object-contain"
              height={selectedImage.height ?? 900}
              src={selectedImage.publicUrl}
              width={selectedImage.width ?? 1200}
            />
            <p className="mt-4 max-w-3xl text-center text-sm leading-6 text-white/75">
              {selectedImage.caption ?? selectedImage.alt_text}
            </p>
          </div>

          {images.length > 1 ? (
            <div
              className="flex items-center justify-center gap-3"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="border border-white/50 px-5 py-3 text-sm font-semibold hover:bg-white hover:text-[#17352B] focus:outline-none focus:ring-2 focus:ring-white"
                onClick={showPrevious}
                type="button"
              >
                Previous
              </button>
              <button
                className="border border-white/50 px-5 py-3 text-sm font-semibold hover:bg-white hover:text-[#17352B] focus:outline-none focus:ring-2 focus:ring-white"
                onClick={showNext}
                type="button"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
