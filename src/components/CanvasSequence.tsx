"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, MotionValue, motion } from "framer-motion";

interface CanvasSequenceProps {
  scenePath: string; // e.g., "/images/scene-1/ezgif-frame-"
  frameCount: number; // e.g., 120
  progress: MotionValue<number>; // 0 to 1
  opacity: MotionValue<number>; // 0 to 1
  extension?: string;
  padLength?: number;
  startFrame?: number;
}

export default function CanvasSequence({
  scenePath,
  frameCount,
  progress,
  opacity,
  extension = ".jpg",
  padLength = 3,
  startFrame = 1,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = startFrame; i < startFrame + frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(padLength, "0");
      img.src = `${scenePath}${paddedIndex}${extension}`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, [scenePath, frameCount, extension, padLength, startFrame]);

  useMotionValueEvent(progress, "change", (latest) => {
    if (!imagesLoaded || !canvasRef.current) return;
    
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    
    // Map 0-1 to 0-(frameCount-1) safely
    const index = Math.min(frameCount - 1, Math.max(0, Math.round(latest * (frameCount - 1))));
    const img = images[index];
    
    if (img && img.complete && img.naturalWidth !== 0) {
      const canvas = canvasRef.current;
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  });

  // Handle Resize & Initial Draw
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && imagesLoaded) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        
        // Trigger initial draw
        const latest = progress.get();
        const index = Math.min(frameCount - 1, Math.max(0, Math.round(latest * (frameCount - 1))));
        const img = images[index];
        const context = canvasRef.current.getContext("2d");
        
        if (img && img.complete && img.naturalWidth !== 0 && context) {
           const canvas = canvasRef.current;
           const hRatio = canvas.width / img.width;
           const vRatio = canvas.height / img.height;
           const ratio = Math.max(hRatio, vRatio);
           const centerShift_x = (canvas.width - img.width * ratio) / 2;
           const centerShift_y = (canvas.height - img.height * ratio) / 2;
           
           context.clearRect(0, 0, canvas.width, canvas.height);
           context.drawImage(
             img,
             0, 0, img.width, img.height,
             centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
           );
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, images, progress]);

  return (
    <motion.canvas
      ref={canvasRef}
      style={{ opacity }}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}
