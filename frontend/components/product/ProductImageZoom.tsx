"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

interface ProductImageZoomProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}

export default function ProductImageZoom({
  src,
  alt,
  priority = false,
  sizes = "100vw"
}: ProductImageZoomProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTouchTimeRef = useRef<number>(0);

  // Disable pinch zoom
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const handleGestureStart = (e: any) => {
      e.preventDefault();
    };

    document.addEventListener("touchmove", handleTouchMove, {
      passive: false
    });
    document.addEventListener("gesturestart", handleGestureStart, {
      passive: false
    });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("gesturestart", handleGestureStart);
    };
  }, []);

  // Calculate max pan bounds
  const getMaxPan = () => {
    if (!containerRef.current || zoomLevel <= 1) return { x: 0, y: 0 };

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    const zoomedWidth = containerWidth * zoomLevel;
    const zoomedHeight = containerHeight * zoomLevel;

    return {
      x: (zoomedWidth - containerWidth) / 2,
      y: (zoomedHeight - containerHeight) / 2
    };
  };

  // Constrain pan position within bounds
  const constrainPan = (x: number, y: number) => {
    const maxPan = getMaxPan();
    return {
      x: Math.max(-maxPan.x, Math.min(maxPan.x, x)),
      y: Math.max(-maxPan.y, Math.min(maxPan.y, y))
    };
  };

  // Animate momentum/inertia
  useEffect(() => {
    if (!isAnimating || zoomLevel <= 1) return;

    const animate = () => {
      setVelocity((prev) => {
        const friction = 0.94; // Deceleration factor
        const newVelX = prev.x * friction;
        const newVelY = prev.y * friction;

        // Stop animation when velocity is negligible
        if (Math.abs(newVelX) < 0.1 && Math.abs(newVelY) < 0.1) {
          setIsAnimating(false);
          return { x: 0, y: 0 };
        }

        setPanPosition((prevPos) => {
          const newPos = constrainPan(
            prevPos.x + newVelX,
            prevPos.y + newVelY
          );
          return newPos;
        });

        return { x: newVelX, y: newVelY };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating, zoomLevel]);

  const handleZoomIn = () => {
    if (zoomLevel < 3) {
      const newZoom = Math.min(zoomLevel + 0.5, 3);
      setZoomLevel(newZoom);
      // Reset pan when zooming to maintain user context
      setPanPosition({ x: 0, y: 0 });
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      const newZoom = Math.max(zoomLevel - 0.5, 1);
      setZoomLevel(newZoom);

      // Reset pan when reaching zoom level 1
      if (newZoom === 1) {
        setPanPosition({ x: 0, y: 0 });
        setIsAnimating(false);
      } else {
        setPanPosition({ x: 0, y: 0 });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1 || e.touches.length !== 1) return;

    setIsPanning(true);
    setIsAnimating(false); // Stop momentum animation on user touch
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
    lastTouchTimeRef.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPanning || zoomLevel <= 1 || !containerRef.current) return;

    e.preventDefault();

    const deltaX = e.touches[0].clientX - touchStart.x;
    const deltaY = e.touches[0].clientY - touchStart.y;

    const newPosition = constrainPan(
      panPosition.x + deltaX,
      panPosition.y + deltaY
    );

    setPanPosition(newPosition);
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPanning || zoomLevel <= 1) {
      setIsPanning(false);
      return;
    }

    const touchDuration = Date.now() - lastTouchTimeRef.current;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    // Calculate velocity for momentum effect
    const velX = (endX - touchStart.x) / (touchDuration || 1);
    const velY = (endY - touchStart.y) / (touchDuration || 1);

    setVelocity({ x: velX * 0.8, y: velY * 0.8 });
    setIsPanning(false);

    // Only animate if velocity is significant
    if (Math.abs(velX) > 0.5 || Math.abs(velY) > 0.5) {
      setIsAnimating(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full overflow-hidden bg-neutral-100 border border-neutral-200 touch-none"
      style={{ touchAction: "none" }}
    >
      {/* Image Container with Zoom & Pan */}
      <div
        ref={imageRef}
        className="relative h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: zoomLevel > 1 ? (isPanning ? "grabbing" : "grab") : "default",
          willChange: "transform"
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={{
            transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
            transformOrigin: "center",
            transition: isPanning ? "none" : "transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            willChange: "transform"
          }}
          priority={priority}
          sizes={sizes}
        />

        {/* Subtle overlay when zoomed */}
        {zoomLevel > 1 && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)",
              opacity: (zoomLevel - 1) / 2
            }}
          />
        )}
      </div>

      {/* Zoom Controls - Plus Button (Bottom Left) */}
      <button
        onClick={handleZoomIn}
        disabled={zoomLevel >= 3}
        className="absolute bottom-4 left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 disabled:bg-black/30 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 backdrop-blur-sm"
        style={{ minWidth: "44px", minHeight: "44px", touchAction: "manipulation" }}
        title="Zoom in"
        aria-label="Zoom in"
      >
        <PlusIcon className="h-5 w-5 text-white" />
      </button>

      {/* Zoom Controls - Minus Button (Bottom Right) */}
      <button
        onClick={handleZoomOut}
        disabled={zoomLevel <= 1}
        className="absolute bottom-4 right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 disabled:bg-black/30 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 backdrop-blur-sm"
        style={{ minWidth: "44px", minHeight: "44px", touchAction: "manipulation" }}
        title="Zoom out"
        aria-label="Zoom out"
      >
        <MinusIcon className="h-5 w-5 text-white" />
      </button>

      {/* Zoom Level Indicator (Optional) */}
      {zoomLevel > 1 && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/50 text-white text-xs font-semibold backdrop-blur-sm">
          {(zoomLevel * 10).toFixed(0)}%
        </div>
      )}
    </div>
  );
}
