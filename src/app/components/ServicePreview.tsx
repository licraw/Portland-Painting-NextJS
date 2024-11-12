import Image from "next/image";
import React, { ReactNode } from "react";

interface ServicePreviewProps {
  title: string;
  icon: string;
  images: string[];
  children: ReactNode;
}

export default function ServicePreview({ title, icon, images, children }: ServicePreviewProps) {
  return (
    <div className="my-12 p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Icon and Title */}
      <div className="flex items-center gap-4 mb-6">
        <Image src={icon} alt={`${title} icon`} width={40} height={40} />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {/* Masonry Image Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6" style={{ gridAutoFlow: "dense" }}>
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <Image src={src} alt={`${title} gallery image ${index + 1}`} width={200} height={150} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>

      {/* Content (Children) */}
      <div className="text-lg space-y-4">{children}</div>
    </div>
  );
}
