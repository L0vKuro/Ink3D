"use client";
// Drop-in replacement for a plain <Image> inside a product card. Pass
// either a single `image` (unchanged, existing behavior) or an `images`
// array (new) for items that have more than one photo — e.g. a coaster's
// front and back. When there's more than one image, tapping the picture
// cycles through them and small dots at the bottom show how many there
// are and which one is showing. Falls back to the existing "3D
// IMG_PLACEHOLDER" box when there's no image at all, same as before.
import { useState } from "react";
import Image from "next/image";

export default function ProductImage({ image, images, alt, imgClassName = "object-contain p-6", placeholderColor = "#ae1fe3" }) {
  const list = images && images.length > 0 ? images : image ? [image] : [];
  const [index, setIndex] = useState(0);
  const hasMultiple = list.length > 1;

  if (list.length === 0) {
    return (
      <div className="relative z-10 text-center">
        <div className="text-[70px] font-black leading-none select-none" style={{ WebkitTextStroke: `1px ${placeholderColor}33`, color: "transparent" }}>3D</div>
        <div className="font-mono-custom text-[9px] text-white/15 tracking-[0.3em] mt-2">IMG_PLACEHOLDER</div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`relative w-full h-full ${hasMultiple ? "cursor-pointer" : ""}`}
        onClick={
          hasMultiple
            ? (e) => {
                e.stopPropagation();
                setIndex((i) => (i + 1) % list.length);
              }
            : undefined
        }
        title={hasMultiple ? "Tap to see the other side" : undefined}
      >
        <Image src={list[index]} alt={alt} fill className={`transition-opacity duration-200 ${imgClassName}`} />
      </div>
      {hasMultiple && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 pointer-events-none">
          {list.map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-200"
              style={{ background: i === index ? "#ae1fe3" : "rgba(255,255,255,0.25)" }}
            />
          ))}
        </div>
      )}
    </>
  );
}
