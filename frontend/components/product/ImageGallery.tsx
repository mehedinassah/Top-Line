'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  onImageSelect?: (index: number) => void;
}

export default function ImageGallery({ images, productName, onImageSelect }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const imageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const panStartX = useRef(0);
  const panStartY = useRef(0);
  const lastDistanceRef = useRef(0);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPanPosRef = useRef({ x: 0, y: 0 });
  const lastPanTimeRef = useRef(0);
  const doubleTapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapTimeRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock background scroll when zoomed
  useEffect(() => {
    if (isZooming && isMobile) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isZooming, isMobile]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    onImageSelect?.(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    onImageSelect?.(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || isMobile) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPos({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setZoomPos({ x: 50, y: 50 });
  };

  const resetZoom = useCallback(() => {
    setIsAnimating(true);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setIsZooming(false);
    setTimeout(() => setIsAnimating(false), 300);
  }, []);

  const handleDoubleTap = useCallback((tapX: number, tapY: number) => {
    if (zoomLevel >= 3) {
      resetZoom();
    } else {
      setIsAnimating(true);
      const newZoom = zoomLevel === 1 ? 2 : 3.5;
      setZoomLevel(newZoom);
      setZoomPos({ x: tapX, y: tapY });
      setIsZooming(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [zoomLevel, resetZoom]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const now = Date.now();
      const timeSinceLastTap = now - lastTapTimeRef.current;

      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = now;
      panStartX.current = panOffset.x;
      panStartY.current = panOffset.y;
      lastPanPosRef.current = { x: touchStartX.current, y: touchStartY.current };
      lastPanTimeRef.current = now;

      // Double tap detection
      if (timeSinceLastTap < 300) {
        if (doubleTapTimerRef.current) clearTimeout(doubleTapTimerRef.current);
        
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const tapX = ((touchStartX.current - rect.left) / rect.width) * 100;
        const tapY = ((touchStartY.current - rect.top) / rect.height) * 100;
        
        handleDoubleTap(tapX, tapY);
        lastTapTimeRef.current = 0;
      } else {
        lastTapTimeRef.current = now;
      }
    } else if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      lastDistanceRef.current = distance;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Pinch zoom with two fingers
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (lastDistanceRef.current > 0) {
        const scale = distance / lastDistanceRef.current;
        const newZoom = Math.max(1, Math.min(4, zoomLevel * scale));
        setZoomLevel(newZoom);
        setIsZooming(newZoom > 1);
        
        // Center pinch point
        const centerX = ((touch1.clientX + touch2.clientX) / 2 - (imageRef.current?.getBoundingClientRect().left || 0)) / (imageRef.current?.clientWidth || 1) * 100;
        const centerY = ((touch1.clientY + touch2.clientY) / 2 - (imageRef.current?.getBoundingClientRect().top || 0)) / (imageRef.current?.clientHeight || 1) * 100;
        setZoomPos({ x: Math.max(0, Math.min(100, centerX)), y: Math.max(0, Math.min(100, centerY)) });
      }
      lastDistanceRef.current = distance;
    } 
    // Single finger pan when zoomed
    else if (e.touches.length === 1 && zoomLevel > 1) {
      e.preventDefault();
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - touchStartX.current;
      const deltaY = currentY - touchStartY.current;

      // Calculate velocity for momentum
      const now = Date.now();
      const timeDelta = now - lastPanTimeRef.current;
      if (timeDelta > 0) {
        velocityRef.current = {
          x: (currentX - lastPanPosRef.current.x) / timeDelta,
          y: (currentY - lastPanPosRef.current.y) / timeDelta,
        };
      }
      lastPanPosRef.current = { x: currentX, y: currentY };
      lastPanTimeRef.current = now;

      setPanOffset({ x: panStartX.current + deltaX, y: panStartY.current + deltaY });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      lastDistanceRef.current = 0;

      // Swipe down to exit zoom
      const touchDuration = Date.now() - touchStartTime.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      
      if (zoomLevel > 1 && deltaY > 80 && touchDuration < 300) {
        resetZoom();
        return;
      }

      // Apply momentum/inertia
      if (zoomLevel > 1) {
        const momentumX = velocityRef.current.x * 50;
        const momentumY = velocityRef.current.y * 50;
        
        setIsAnimating(true);
        setPanOffset({
          x: panOffset.x + momentumX,
          y: panOffset.y + momentumY,
        });
        
        setTimeout(() => setIsAnimating(false), 300);
      } else if (zoomLevel === 1) {
        // Swipe navigation
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchStartX.current - touchEndX;

        if (Math.abs(deltaX) > 50 && touchDuration < 300) {
          if (deltaX > 0) {
            handleNext();
          } else {
            handlePrev();
          }
        }
      }
    }
  };

  const displayImage = images[currentIndex] || '/placeholder-product.png';
  const panX = isZooming ? (panOffset.x / (imageRef.current?.clientWidth || 1)) * 100 : 0;
  const panY = isZooming ? (panOffset.y / (imageRef.current?.clientHeight || 1)) * 100 : 0;

  return (
    <div className="w-full space-y-3 md:space-y-4">
      {/* Main Image Container */}
      <div
        ref={imageRef}
        className={`relative w-full bg-gray-100 overflow-hidden group flex items-center justify-center ${
          isMobile ? 'aspect-square' : 'aspect-auto h-96 md:h-[600px]'
        }`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          touchAction: zoomLevel > 1 ? 'none' : 'auto',
          cursor: isHovering ? 'crosshair' : isMobile ? (zoomLevel > 1 ? 'grab' : 'pointer') : 'default',
          backgroundColor: isZooming ? 'rgba(0, 0, 0, 0.3)' : 'transparent'
        }}
      >
        {/* Backdrop Blur when zoomed */}
        {isZooming && isMobile && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0 transition-opacity duration-300" />
        )}

        {/* Image */}
        <div
          style={{
            transform: isHovering 
              ? `scale(1.5)` 
              : isMobile 
                ? `translate3d(${panX}px, ${panY}px, 0) scale(${zoomLevel})`
                : 'scale(1)',
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transition: isAnimating ? 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            willChange: 'transform',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <Image
            src={displayImage}
            alt={`${productName} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
          />
        </div>

        {/* Hover Hint - Desktop Only */}
        {!isMobile && !isHovering && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none flex items-center justify-center">
            <div className="text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-3 py-1 rounded">
              Hover to zoom
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && !isZooming && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white p-1.5 md:p-2 shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white p-1.5 md:p-2 shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && !isZooming && (
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-black/60 text-white px-2 md:px-3 py-1 text-xs md:text-sm font-medium z-10">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Mobile Hints */}
        {isMobile && zoomLevel === 1 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/70 text-xs font-medium text-center z-10 transition-opacity duration-300">
            Double-tap to zoom • Swipe to navigate
          </div>
        )}

        {/* Zoom Info */}
        {isZooming && isMobile && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 text-xs font-medium rounded backdrop-blur-sm z-20 transition-opacity duration-300">
            <div>Zoom: {Math.round(zoomLevel * 100) / 100}x</div>
            <div className="text-white/70 text-xs mt-1">Tap to close</div>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && !isZooming && (
        <div className="grid grid-cols-3 gap-2 md:gap-3 px-2 md:px-0">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                onImageSelect?.(index);
              }}
              className={`relative w-full aspect-square overflow-hidden border-2 transition-all ${
                index === currentIndex ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
              }`}
              aria-label={`View image ${index + 1}`}
              title={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 120px, 160px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

