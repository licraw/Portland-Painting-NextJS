"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { ProjectStoryImage } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  createSignedProjectImageUpload,
  deleteProjectImage,
  finalizeProjectImageUpload,
} from "./image-actions";

const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maximumImages = 12;
const maximumDimension = 2400;
const maximumImageBytes = 3 * 1024 * 1024;
const targetImageBytes = 2.75 * 1024 * 1024;

export type ProjectImageWithUrl = ProjectStoryImage & { publicUrl: string };

type PendingPhoto = {
  altText: string;
  file: File;
  height: number;
  id: string;
  originalBytes: number;
  previewUrl: string;
  width: number;
};

type ProjectPhotoManagerProps = {
  images: ProjectImageWithUrl[];
  projectId: number;
};

function formatBytes(value: number) {
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function toWebpBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error("This browser could not convert the photo.")),
      "image/webp",
      quality
    );
  });
}

function getOutputName(originalName: string) {
  const baseName = originalName
    .replace(/\.[^.]+$/, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return `${baseName || "project-photo"}.webp`;
}

async function optimizePhoto(file: File) {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  let scale = Math.min(1, maximumDimension / Math.max(bitmap.width, bitmap.height));
  let lastBlob: Blob | null = null;
  let outputWidth = 0;
  let outputHeight = 0;

  try {
    for (let sizeAttempt = 0; sizeAttempt < 4; sizeAttempt += 1) {
      outputWidth = Math.max(1, Math.round(bitmap.width * scale));
      outputHeight = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const context = canvas.getContext("2d");

      if (!context) throw new Error("This browser could not process the photo.");

      context.drawImage(bitmap, 0, 0, outputWidth, outputHeight);

      for (const quality of [0.82, 0.72, 0.62]) {
        lastBlob = await toWebpBlob(canvas, quality);
        if (lastBlob.size <= targetImageBytes) break;
      }

      if (lastBlob && lastBlob.size <= maximumImageBytes) break;
      scale *= 0.82;
    }
  } finally {
    bitmap.close();
  }

  if (!lastBlob || lastBlob.size > maximumImageBytes) {
    throw new Error("The photo is still too large after optimization.");
  }

  return {
    file: new File([lastBlob], getOutputName(file.name), {
      lastModified: Date.now(),
      type: "image/webp",
    }),
    height: outputHeight,
    width: outputWidth,
  };
}

export default function ProjectPhotoManager({
  images,
  projectId,
}: ProjectPhotoManagerProps) {
  const router = useRouter();
  const pendingPhotosRef = useRef<PendingPhoto[]>([]);
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    pendingPhotosRef.current = pendingPhotos;
  }, [pendingPhotos]);

  useEffect(() => {
    return () => {
      pendingPhotosRef.current.forEach((photo) =>
        URL.revokeObjectURL(photo.previewUrl)
      );
    };
  }, []);

  async function handleFileSelection(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    const spacesRemaining = maximumImages - images.length - pendingPhotos.length;

    setError(null);
    setMessage(null);

    if (files.length === 0) return;
    if (spacesRemaining < 1 || files.length > spacesRemaining) {
      setError(`Choose up to ${spacesRemaining} more photo${spacesRemaining === 1 ? "" : "s"}.`);
      event.target.value = "";
      return;
    }

    const unsupported = files.find((file) => !acceptedTypes.has(file.type));
    if (unsupported) {
      setError("Use JPEG, PNG, or WebP photos. HEIC is not supported yet.");
      event.target.value = "";
      return;
    }

    setIsProcessing(true);
    const optimized: PendingPhoto[] = [];
    try {
      for (const file of files) {
        const result = await optimizePhoto(file);
        optimized.push({
          altText: "",
          file: result.file,
          height: result.height,
          id: crypto.randomUUID(),
          originalBytes: file.size,
          previewUrl: URL.createObjectURL(result.file),
          width: result.width,
        });
      }

      setPendingPhotos((current) => [...current, ...optimized]);
    } catch (selectionError) {
      optimized.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
      setError(
        selectionError instanceof Error
          ? selectionError.message
          : "The selected photos could not be processed."
      );
    } finally {
      setIsProcessing(false);
      event.target.value = "";
    }
  }

  function removePendingPhoto(id: string) {
    setPendingPhotos((current) => {
      const photo = current.find((item) => item.id === id);
      if (photo) URL.revokeObjectURL(photo.previewUrl);
      return current.filter((item) => item.id !== id);
    });
  }

  function updateAltText(id: string, altText: string) {
    setPendingPhotos((current) =>
      current.map((photo) => (photo.id === id ? { ...photo, altText } : photo))
    );
  }

  async function uploadPhotos() {
    setError(null);
    setMessage(null);

    if (pendingPhotos.length === 0) return;
    if (pendingPhotos.some((photo) => photo.altText.trim().length < 3)) {
      setError("Add a short image description to every photo before uploading.");
      return;
    }

    setIsUploading(true);
    const uploadedIds = new Set<string>();

    try {
      const supabase = createSupabaseBrowserClient();

      for (let index = 0; index < pendingPhotos.length; index += 1) {
        const photo = pendingPhotos[index];
        setMessage(`Uploading photo ${index + 1} of ${pendingPhotos.length}…`);

        const signedUpload = await createSignedProjectImageUpload(projectId);
        if (!signedUpload.ok) throw new Error(signedUpload.error);

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .uploadToSignedUrl(signedUpload.path, signedUpload.token, photo.file, {
            cacheControl: "31536000",
            contentType: "image/webp",
          });

        if (uploadError) throw new Error("The photo upload failed. Try again.");

        const finalized = await finalizeProjectImageUpload(projectId, {
          altText: photo.altText,
          height: photo.height,
          path: signedUpload.path,
          width: photo.width,
        });

        if (!finalized.ok) throw new Error(finalized.error);
        uploadedIds.add(photo.id);
      }

      setMessage(
        `${uploadedIds.size} photo${uploadedIds.size === 1 ? "" : "s"} uploaded.`
      );
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "The photos could not be uploaded."
      );
      setMessage(null);
    } finally {
      setPendingPhotos((current) => {
        current
          .filter((photo) => uploadedIds.has(photo.id))
          .forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
        return current.filter((photo) => !uploadedIds.has(photo.id));
      });
      setIsUploading(false);
      if (uploadedIds.size > 0) router.refresh();
    }
  }

  async function removeUploadedPhoto(image: ProjectImageWithUrl) {
    if (!window.confirm("Remove this photo from the project?")) return;

    setError(null);
    setMessage(null);
    setDeletingId(image.id);
    const result = await deleteProjectImage(projectId, image.id);
    setDeletingId(null);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setMessage("Photo removed.");
    router.refresh();
  }

  const spacesRemaining = maximumImages - images.length - pendingPhotos.length;

  return (
    <section className="mt-10 border-y border-[#20231F]/15 py-10" aria-labelledby="project-photos-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#17352B]" id="project-photos-heading">
            Project photos
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#20231F]/65">
            Add up to {maximumImages} JPEG, PNG, or WebP photos. They are resized,
            converted to WebP, and stripped of embedded metadata before upload.
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#687760]">
          {images.length} of {maximumImages} uploaded
        </p>
      </div>

      {images.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {images.map((image) => (
            <figure className="border border-[#20231F]/20 bg-white p-3" key={image.id}>
              <div className="aspect-[4/3] overflow-hidden bg-[#E5DFD3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={image.alt_text}
                  className="h-full w-full object-cover"
                  height={image.height ?? 900}
                  loading="lazy"
                  src={image.publicUrl}
                  width={image.width ?? 1200}
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-4">
                <figcaption className="text-sm leading-5 text-[#20231F]/70">
                  {image.alt_text}
                  {image.is_cover ? (
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#687760]">
                      Cover
                    </span>
                  ) : null}
                </figcaption>
                <button
                  className="shrink-0 text-sm font-medium text-[#7A3525] underline decoration-[#7A3525]/35 underline-offset-4 hover:decoration-[#7A3525] disabled:opacity-50"
                  disabled={deletingId !== null || isUploading}
                  onClick={() => removeUploadedPhoto(image)}
                  type="button"
                >
                  {deletingId === image.id ? "Removing…" : "Remove"}
                </button>
              </div>
            </figure>
          ))}
        </div>
      ) : (
        <p className="mt-6 border border-dashed border-[#20231F]/30 px-5 py-8 text-center text-sm text-[#20231F]/60">
          No project photos uploaded yet.
        </p>
      )}

      {pendingPhotos.length > 0 ? (
        <div className="mt-8 space-y-5">
          <h3 className="text-sm font-semibold text-[#17352B]">Ready to upload</h3>
          {pendingPhotos.map((photo) => (
            <div
              className="grid gap-4 border border-[#20231F]/20 bg-[#FAF8F3] p-4 sm:grid-cols-[10rem_1fr]"
              key={photo.id}
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#E5DFD3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="h-full w-full object-cover"
                  height={photo.height}
                  src={photo.previewUrl}
                  width={photo.width}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#20231F]" htmlFor={`photo-alt-${photo.id}`}>
                  Image description
                </label>
                <input
                  className="mt-2 w-full border border-[#20231F]/30 bg-white px-3 py-2 text-sm outline-none focus:border-[#17352B] focus:ring-2 focus:ring-[#17352B]/20"
                  id={`photo-alt-${photo.id}`}
                  maxLength={240}
                  onChange={(event) => updateAltText(photo.id, event.target.value)}
                  placeholder="Crew repairing weathered siding"
                  required
                  value={photo.altText}
                />
                <p className="mt-2 text-xs text-[#20231F]/55">
                  {formatBytes(photo.originalBytes)} → {formatBytes(photo.file.size)} · {photo.width} × {photo.height}
                </p>
                <button
                  className="mt-3 text-sm font-medium text-[#7A3525] underline decoration-[#7A3525]/35 underline-offset-4 hover:decoration-[#7A3525]"
                  disabled={isUploading}
                  onClick={() => removePendingPhoto(photo.id)}
                  type="button"
                >
                  Remove selection
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          disabled={isProcessing || isUploading || spacesRemaining < 1}
          id="project-photo-files"
          multiple
          onChange={handleFileSelection}
          type="file"
        />
        <label
          className={`border border-[#17352B] px-5 py-3 text-sm font-semibold text-[#17352B] transition ${
            isProcessing || isUploading || spacesRemaining < 1
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-white focus-within:ring-2 focus-within:ring-[#17352B]"
          }`}
          htmlFor="project-photo-files"
        >
          {isProcessing ? "Optimizing…" : "Choose photos"}
        </label>
        {pendingPhotos.length > 0 ? (
          <button
            className="bg-[#17352B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#244B3D] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isUploading || isProcessing}
            onClick={uploadPhotos}
            type="button"
          >
            {isUploading ? "Uploading…" : `Upload ${pendingPhotos.length} photo${pendingPhotos.length === 1 ? "" : "s"}`}
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="mt-4 border-l-2 border-[#A84F36] bg-[#A84F36]/10 px-4 py-3 text-sm text-[#7A3525]" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="mt-4 border-l-2 border-[#687760] bg-[#687760]/10 px-4 py-3 text-sm text-[#17352B]" role="status">
          {message}
        </p>
      ) : null}
    </section>
  );
}
