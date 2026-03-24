'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
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
  const [mobileZoom, setMobileZoom] = useState(1);
  const imageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => {
    // Check if mobile on component mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 1 || !imageRef.current) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const touchCurrentY = e.touches[0].clientY;
    const deltaX = touchStartX.current - touchCurrentX;
    const deltaY = touchStartY.current - touchCurrentY;

    // If moving significantly, mark as swiping
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      isSwiping.current = true;
    }

    // If zoomed in, allow panning
    if (mobileZoom > 1) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((touchCurrentX - rect.left) / rect.width) * 100;
      const y = ((touchCurrentY - rect.top) / rect.height) * 100;
      setZoomPos({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y))
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchDuration = Date.now() - touchStartTime.current;
    
    // If it's a quick tap (not a long press) and not swiping
    if (touchDuration < 300 && !isSwiping.current) {
      if (!imageRef.current) return;
      
      // Calculate tap position
      const rect = imageRef.current.getBoundingClientRect();
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const tapX = ((touchEndX - rect.left) / rect.width) * 100;
      const tapY = ((touchEndY - rect.top) / rect.height) * 100;
      
      // Toggle zoom: if already zoomed, reset; otherwise zoom to tap position
      if (mobileZoom > 1) {
        setMobileZoom(1);
        setZoomPos({ x: 50, y: 50 });
      } else {
        setZoomPos({
          x: Math.max(0, Math.min(100, tapX)),
          y: Math.max(0, Math.min(100, tapY))
        });
        setMobileZoom(2.5);
      }
    } else if (isSwiping.current && mobileZoom === 1) {
      // Handle swipe navigation only if not zoomed
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchStartX.current - touchEndX;

      // Only register as horizontal swipe if movement is significant
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
    
    isSwiping.current = false;
  };

  const displayImage = images[currentIndex] || '/placeholder-product.png';

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
        style={{ cursor: isHovering ? 'crosshair' : isMobile ? (mobileZoom > 1 ? 'grab' : 'pointer') : 'default' }}
      >
        <Image
          src={displayImage}
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-200"
          style={{
            transform: isHovering ? `scale(1.5)` : isMobile && mobileZoom > 1 ? `scale(${mobileZoom})` : 'scale(1)',
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            willChange: isHovering || (isMobile && mobileZoom > 1) ? 'transform' : 'auto',
          }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
        />

        {/* Hover Hint - Desktop Only */}
        {!isMobile && !isHovering && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none flex items-center justify-center">
            <div className="text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-3 py-1 rounded">
              Hover to zoom
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
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
        {images.length > 1 && (
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-black/60 text-white px-2 md:px-3 py-1 text-xs md:text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Swipe Indicator on Mobile */}
        {isMobile && images.length > 1 && mobileZoom === 1 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/70 text-xs font-medium text-center">
            Tap to zoom • Swipe to navigate
          </div>
        )}
        
        {/* Zoom Reset Hint */}
        {isMobile && mobileZoom > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 text-xs font-medium rounded">
            Tap to reset
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-2 md:gap-3 px-2 md:px-0">
          {images.slice(1, 4).map((image, index) => (
            <button
              key={index + 1}
              onClick={() => {
                setCurrentIndex(index + 1);
                onImageSelect?.(index + 1);
              }}
              className={`relative w-full aspect-square overflow-hidden border-2 transition-all ${
                index + 1 === currentIndex ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
              }`}
              aria-label={`View image ${index + 2}`}
              title={`View image ${index + 2}`}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 2}`}
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

