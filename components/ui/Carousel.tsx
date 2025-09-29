"use client";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  src: string;
  dec: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
}

const Slide = ({ slide, index, current }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - r.left;
    yRef.current = event.clientY - r.top;
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, dec, title } = slide;

  return (
    <li
      ref={slideRef}
      className="relative flex flex-col items-center justify-center text-center text-white h-screen max-w-full transition-opacity duration-700 ease-in-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: current === index ? 1 : 0.7,
        transform: `translateY(${(current - index) * 10}px)`,
        transition: "opacity 0.7s ease-in-out, transform 0.7s ease-in-out",
      }}
    >
      <div
        className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center z-10 relative px-4 transition-all duration-700 ease-in-out"
        style={{
          transform: current === index ? "scale(1)" : "scale(0.95)",
          filter: current === index ? "blur(0px)" : "blur(1px)",
        }}
      >
        <h2
          className="text-4xl md:text-5xl font-bold mb-8 transition-all duration-700 ease-in-out"
          style={{
            opacity: current === index ? 1 : 0.5,
            transform:
              current === index ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          {title}
        </h2>
        <div
          className="w-full flex items-center justify-center mb-8 transition-all duration-700 ease-in-out"
          style={{
            transform: current === index ? "scale(1)" : "scale(0.98)",
          }}
        >
          <img
            className="w-full max-w-7xl h-auto rounded-2xl object-contain shadow-lg transition-all duration-700 ease-in-out pointer-events-none"
            style={{
              opacity: current === index ? 1 : 0.6,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
        </div>
        <div
          className="w-full max-w-4xl px-4 transition-all duration-700 ease-in-out"
          style={{
            opacity: current === index ? 1 : 0.5,
            transform: current === index ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-xl md:text-2xl font-light text-white text-center">
            {dec}
          </p>
        </div>
      </div>
    </li>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  const scrollToSlide = (index: number) => {
    if (containerRef.current) {
      const slideElement = containerRef.current.children[index] as HTMLElement;
      if (slideElement) {
        isScrolling.current = true;
        slideElement.scrollIntoView({ behavior: "smooth" });

        // Reset scrolling flag after animation completes
        setTimeout(() => {
          isScrolling.current = false;
        }, 800);
      }
    }
  };

  // Hantera scroll-events för att byta slide
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling.current) return;

      const scrollPosition = container.scrollTop;
      const slideHeight = window.innerHeight;
      const newCurrent = Math.round(scrollPosition / slideHeight);

      if (newCurrent !== current) {
        setCurrent(newCurrent);
      }
    };

    // Förbättrad scroll-hantering med requestAnimationFrame
    let ticking = false;

    const smoothHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", smoothHandleScroll);

    return () => {
      container.removeEventListener("scroll", smoothHandleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [current]);

  // CSS transitions för att göra scrollningen mjukare
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .smooth-scroll-container {
        scroll-behavior: smooth;
        scroll-snap-type: y mandatory;
      }
      .smooth-scroll-container > * {
        scroll-snap-align: start;
        scroll-snap-stop: always;
      }
    `;
    document.head.append(style);

    return () => {
      style.remove();
    };
  }, []);

  const id = useId();

  return (
    <div className="relative w-full" aria-labelledby={`carousel-heading-${id}`}>
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto smooth-scroll-container"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
          .smooth-scroll-container {
            scroll-behavior: smooth;
          }
        `}</style>
        {slides.map((slide, index) => (
          <Slide key={index} slide={slide} index={index} current={current} />
        ))}
      </div>
    </div>
  );
}
