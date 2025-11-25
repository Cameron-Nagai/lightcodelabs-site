import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  url: string;
  caption: string;
}

interface CarouselProps {
  images: CarouselImage[];
}

function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl bg-gray-950">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].caption}
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>

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
