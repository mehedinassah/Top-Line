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
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Press-and-hold zoom state
  const [isPressing, setIsPressing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState('50% 50%');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBounceFeedback, setShowBounceFeedback] = useState(false);
  
  const imageRef = useRef<HTMLDivElement>(null);
  const pressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  
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
    if (isPressing && isMobile) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isPressing, isMobile]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    onImageSelect?.(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    onImageSelect?.(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // Desktop hover zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || isMobile) return;
    setIsHovering(true);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Press-and-hold zoom handlers
  const updateZoomPosition = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    setTransformOrigin(`${Math.max(0, Math.min(100, percentX))}% ${Math.max(0, Math.min(100, percentY))}%`);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !isMobile) return; // Only left pointer on mobile
    
    setIsPressing(true);
    setIsAnimating(false);
    updateZoomPosition(e);
    
    // Micro bounce feedback
    setShowBounceFeedback(true);
    setTimeout(() => setShowBounceFeedback(false), 150);
    
    // Activate zoom with micro-scale bounce
    setZoomLevel(0.95);
    setTimeout(() => setZoomLevel(2.5), 50);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPressing || !isMobile) return;
    
    e.preventDefault();
    updateZoomPosition(e);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPressing) return;
    
    setIsPressing(false);
    setIsAnimating(true);
    setZoomLevel(1);
    setTransformOrigin('50% 50%');
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPressing) return;
    
    setIsPressing(false);
    setIsAnimating(true);
    setZoomLevel(1);
    setTransformOrigin('50% 50%');
    
    setTimeout(() => setIsAnimating(false), 300);
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
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        style={{ 
          touchAction: isPressing ? 'none' : 'auto',
          cursor: isHovering ? 'zoom-in' : isMobile ? (isPressing ? 'grabbing' : 'pointer') : 'default',
        }}
      >
        {/* Backdrop Blur when pressing */}
        {isPressing && isMobile && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0 transition-opacity duration-300 pointer-events-none" />
        )}

        {/* Image Container with GPU-Accelerated Zoom */}
        <div
          style={{
            transform: isHovering 
              ? `scale(1.5)` 
              : `translate3d(0, 0, 0) scale(${zoomLevel})`,
            transformOrigin: isMobile ? transformOrigin : '50% 50%',
            transition: isAnimating && !isPressing 
              ? 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)' 
              : 'none',
            willChange: 'transform',
            width: '100%',
            height: '100%',
            position: 'relative',
            filter: isPressing ? 'brightness(1.05)' : 'brightness(1)',
          }}
        >
          <Image
            src={displayImage}
            alt={`${productName} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            draggable={false}
          />
        </div>

        {/* Micro Bounce Feedback */}
        {showBounceFeedback && isPressing && (
          <div className="absolute inset-0 animate-pulse bg-white/5 pointer-events-none" />
        )}

        {/* Hover Hint - Desktop Only */}
        {!isMobile && !isHovering && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none flex items-center justify-center">
            <div className="text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-3 py-1 rounded">
              Hover to zoom
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && !isPressing && (
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
        {images.length > 1 && !isPressing && (
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-black/60 text-white px-2 md:px-3 py-1 text-xs md:text-sm font-medium z-10 transition-opacity duration-300">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Mobile Press Hint */}
        {isMobile && !isPressing && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/70 text-xs font-medium text-center z-10 transition-opacity duration-300 pointer-events-none">
            Press and hold to zoom
          </div>
        )}

        {/* Zoom Level Display */}
        {isPressing && isMobile && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 text-xs font-medium rounded backdrop-blur-sm z-20 transition-all duration-200 pointer-events-none">
            <div className="text-lg font-semibold">{Math.round(zoomLevel * 10) / 10}x</div>
            <div className="text-white/70 text-xs mt-0.5">Magnified</div>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && !isPressing && (
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

