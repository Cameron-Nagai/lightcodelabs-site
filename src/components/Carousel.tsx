import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

export interface CarouselItem {
  url: string;
  caption: string;
  type?: 'image' | 'video' | 'gdrive-video' | 'youtube-video' | 'loop';
  poster?: string;
}

interface CarouselProps {
  images: CarouselItem[];
}

function LoopClip({ item, near, visible }: { item: CarouselItem; near: boolean; visible: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      if (visible && document.visibilityState === 'visible' && !motionQuery.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    update();
    document.addEventListener('visibilitychange', update);
    motionQuery.addEventListener('change', update);
    return () => {
      document.removeEventListener('visibilitychange', update);
      motionQuery.removeEventListener('change', update);
    };
  }, [near, visible, item.url]);

  return (
    <div className="relative w-full h-full">
      <img
        src={item.poster}
        alt={item.caption}
        referrerPolicy="no-referrer"
        decoding="async"
        loading="lazy"
        className="w-full h-full object-contain"
      />
      {near && !failed && (
        <video
          src={item.url}
          poster={item.poster}
          muted
          playsInline
          loop
          preload="metadata"
          aria-label={item.caption}
          onError={() => setFailed(true)}
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
    </div>
  );
}

function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const prefetched = useRef(new Set<string>());

  // Reset video state when changing slides
  useEffect(() => {
    setVideoLoaded(false);
    setIsPortrait(false);
  }, [currentIndex]);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      setVisible(true);
      return;
    }
    const nearObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setNear(true);
          nearObs.disconnect();
        }
      });
    }, { rootMargin: '500px' });
    const visObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    nearObs.observe(el);
    visObs.observe(el);
    return () => {
      nearObs.disconnect();
      visObs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!visible || images.length < 2) return;
    if ((navigator as { connection?: { saveData?: boolean } }).connection?.saveData) return;
    const next = images[(currentIndex + 1) % images.length];
    const nextType = next.type || 'image';
    const src = nextType === 'loop' ? next.poster : nextType === 'image' ? next.url : undefined;
    if (!src || prefetched.current.has(src)) return;
    prefetched.current.add(src);
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.decoding = 'async';
    img.src = src;
  }, [visible, currentIndex, images]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const hasVideo = images.some((item) => item.type === 'video');
  const isVideoSlide = images[currentIndex].type === 'video';

  // Helper function to extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  // Helper function to convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    if (videoId) {
      // Use standard YouTube embed URL with built-in controls
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
    }
    return url;
  };

  // Helper function to convert Google Drive URL to embed URL (keeping for reference)
  const getGDriveEmbedUrl = (url: string) => {
    const fileIdMatch = url.match(/[-\w]{25,}/);
    if (fileIdMatch) {
      return `https://drive.google.com/file/d/${fileIdMatch[0]}/preview`;
    }
    return url;
  };

  // Function to render the appropriate media based on type
  const renderMedia = () => {
    const item = images[currentIndex];
    const type = item.type || 'image'; // Default to image if not specified

    switch (type) {
      case 'youtube-video': {
        const videoId = getYouTubeVideoId(item.url);
        const embedUrl = getYouTubeEmbedUrl(item.url);
        const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

        if (!videoLoaded) {
          // Show thumbnail with play button until user clicks to load video
          return (
            <button
              type="button"
              className="w-full h-full relative group cursor-pointer block"
              onClick={() => setVideoLoaded(true)}
              aria-label={`Play ${item.caption}`}
            >
              {/* Thumbnail image */}
              <img
                src={thumbnailUrl}
                alt={item.caption}
                className="w-full h-full object-cover"
              />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-50 rounded-full p-4 transform transition-transform group-hover:scale-110">
                  <Play size={48} className="text-white" />
                </div>
              </div>
            </button>
          );
        }

        // Show embedded YouTube player with native controls
        return (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={item.caption}
            frameBorder="0"
          />
        );
      }
      case 'gdrive-video':
        return (
          <iframe
            src={getGDriveEmbedUrl(item.url)}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={item.caption}
            frameBorder="0"
          />
        );
      case 'video':
        return (
          <video
            src={item.url}
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
            aria-label={item.caption}
            className="w-full h-full object-contain"
          />
        );
      case 'loop':
        return <LoopClip key={item.url} item={item} near={near} visible={visible} />;
      case 'image':
      default:
        return (
          <img
            src={item.url}
            alt={item.caption}
            onLoad={(e) => setIsPortrait(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth)}
            referrerPolicy="no-referrer"
            decoding="async"
            loading="lazy"
            className="w-full h-full object-contain"
          />
        );
    }
  };

  return (
    <div ref={frame} className="relative w-full max-w-6xl mx-auto" data-video-slide={isVideoSlide || undefined}>
      <div className={`carousel-stage relative overflow-hidden rounded-2xl bg-black border border-white/[.08] transition-[height] duration-500 ${isPortrait ? 'h-[32rem] md:h-[700px]' : 'h-96 md:h-[500px]'}`}>
        {renderMedia()}

        {/* Only show gradient overlay for images and loops, not for videos */}
        {(!images[currentIndex].type || images[currentIndex].type === 'image' || images[currentIndex].type === 'loop') && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
        )}

        <div className={`absolute left-0 right-0 p-8 ${isVideoSlide ? 'top-0 pointer-events-none' : 'bottom-0'}`}>
          <p className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
            {images[currentIndex].caption}
          </p>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="lc-iconbtn absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:scale-110"
        aria-label={hasVideo ? 'Previous slide' : 'Previous image'}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="lc-iconbtn absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:scale-110"
        aria-label={hasVideo ? 'Next slide' : 'Next image'}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="carousel-pages flex justify-center gap-3 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? 'w-12 h-3 bg-teal-400'
                : 'w-3 h-3 bg-white/20 hover:bg-white/40'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
