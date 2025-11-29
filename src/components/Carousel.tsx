import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface CarouselItem {
  url: string;
  caption: string;
  type?: 'image' | 'video' | 'gdrive-video' | 'youtube-video';
}

interface CarouselProps {
  images: CarouselItem[];
}

function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  
  // Reset video state when changing slides
  useEffect(() => {
    setIsPlaying(false);
    setVideoLoaded(false);
    setShowControls(false);
  }, [currentIndex]);

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
      case 'youtube-video':
        const videoId = getYouTubeVideoId(item.url);
        const embedUrl = getYouTubeEmbedUrl(item.url);
        const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
        
        if (!videoLoaded) {
          // Show thumbnail with play button until user clicks to load video
          return (
            <div className="w-full h-full relative group cursor-pointer" onClick={() => setVideoLoaded(true)}>
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
            </div>
          );
        }
        
        // Show embedded YouTube player with custom controls
        return (
          <div 
            className="w-full h-full relative" 
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* YouTube iframe with API enabled */}
            <iframe
              ref={videoRef}
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={item.caption}
              frameBorder="0"
            />
            
            {/* Custom video controls */}
            {showControls && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent flex items-center gap-4">
                <button 
                  onClick={isPlaying ? pauseVideo : playVideo}
                  className="text-white hover:text-cyan-400 transition-colors"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                
                <button 
                  onClick={toggleMute}
                  className="text-white hover:text-cyan-400 transition-colors"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
              </div>
            )}
          </div>
        );
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
            className="w-full h-full object-contain"
          />
        );
      case 'image':
      default:
        // Check if the image is an animated WebP or GIF
        const isAnimated = item.url.endsWith('.gif') || item.url.endsWith('.webp');
        
        return (
          <img
            src={item.url}
            alt={item.caption}
            className={`w-full h-full ${isAnimated ? 'object-contain' : 'object-cover'} transition-opacity duration-500`}
            loading="eager" // Ensure animated content loads immediately
          />
        );
    }
  };

  // For debugging - log the current item and its embed URL
  const currentItem = images[currentIndex];
  console.log('Current item:', currentItem);
  if (currentItem.type === 'gdrive-video') {
    console.log('Embed URL:', getGDriveEmbedUrl(currentItem.url));
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl bg-gray-950">
        {renderMedia()}

        {/* Only show gradient overlay for images, not for videos */}
        {(!images[currentIndex].type || images[currentIndex].type === 'image') && (
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <p className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
            {images[currentIndex].caption}
          </p>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-800 p-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-800 p-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="flex justify-center gap-3 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? 'w-12 h-3 bg-cyan-400'
                : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
