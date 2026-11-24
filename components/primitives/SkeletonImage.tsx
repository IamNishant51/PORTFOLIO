"use client";

import { useState, useCallback } from "react";
import Image, { ImageProps } from "next/image";

export function SkeletonImage({ className = "", onLoad, onError, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node && node.complete && node.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <>
      {!loaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-paper-deep animate-skeleton pointer-events-none"
        />
      )}
      <Image
        {...props}
        ref={imgRef}
        alt={alt}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
        className={`${className} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
