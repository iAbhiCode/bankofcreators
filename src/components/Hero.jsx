import React, { useState, useEffect, useRef } from "react";
import styles from "../style";

const Hero = () => {
  const quotes = [
    {
      title: "Coming Soon",
      heading: "Bank of Creators",
      description:
        "Bank of Creators is an all-in-one-platform for artists, songwriters, and composers – helping you distribute music, account and collect royalties, and get paid.",
      cta: "Join Us. Pre-register",
    },
    {
      title: "Our Purpose",
      heading: "Your Music. Your Rights. Your Future.",
      description: "Empowering you to own your own music and your future",
      cta: "Join Us. Pre-register",
    },
    {
      title: "Our Mission",
      heading: "Democratising music distribution",
      description:
        "Where you keep 100% of your royalty earnings, take advantage of royalty income advance, and all the tools to help you grow your music career",
      cta: "Join Us. Pre-register",
    },
    {
      title: "Our Vision",
      heading: "A world where independent artists thrive",
      description:
        "A world where independent artists and independent labels in Middle East and Africa thrive on their own terms",
      cta: "Join Us. Pre-register",
    },
    {
      title: "Join the Waiting List",
      heading: "Pre-register Today",
      description:
        "Be the first to know when we launch and get exclusive benefits",
      cta: "Pre-register Now",
    },
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Set to true by default
  const timeoutRef = useRef(null);
  const audioRef = useRef(null);

  // Auto-play audio when component mounts
  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          // Try to play audio automatically
          const playPromise = audioRef.current.play();

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Autoplay started successfully
                setIsPlaying(true);
              })
              .catch((error) => {
                // Autoplay was prevented by browser
                console.log("Autoplay prevented:", error);
                setIsPlaying(false);
              });
          }
        }
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    };

    playAudio();
  }, []);

  // Handle music playback
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle automatic rotation
  useEffect(() => {
    const autoPlay = () => {
      setAnimationDirection("next");
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 300);
    };

    timeoutRef.current = setTimeout(autoPlay, 7000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentQuoteIndex, quotes.length]);

  const handleSlideChange = (direction) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setAnimationDirection(direction);
    setIsTransitioning(true);

    setTimeout(() => {
      if (direction === "next") {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      } else {
        setCurrentQuoteIndex((prevIndex) =>
          prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
        );
      }

      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  const goToSlide = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const direction = index > currentQuoteIndex ? "next" : "prev";
    setAnimationDirection(direction);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentQuoteIndex(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 3000);
  };

  const currentQuote = quotes[currentQuoteIndex];

  // Split the heading for styling
  const splitHeading = () => {
    const words = currentQuote.heading.split(" ");
    if (words.length === 1) return { start: "", end: words[0] };
    const lastWord = words.pop();
    return {
      start: words.join(" "),
      end: lastWord,
    };
  };

  const { start: headingStart, end: headingEnd } = splitHeading();

  // Animation classes
  const getContentAnimationClass = () => {
    if (isTransitioning) {
      return animationDirection === "next"
        ? "translate-x-[-10px] opacity-0"
        : "translate-x-[10px] opacity-0";
    }
    return "translate-x-0 opacity-100";
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-primary"
    >
      {/* Audio Element - Updated with external music link */}
      <audio
        ref={audioRef}
        src="https://freelistenonline.com/music/vkstream/77966278"
        loop
        autoPlay
        muted={false}
        playsInline
      />
      {/* Video background with dark overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://cdn.pixabay.com/video/2015/11/07/1275-145116912_medium.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay instead of blur */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>
      {/* Music control button */}
      <div className="absolute top-24 right-6 z-30">
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 bg-opacity-70 text-white hover:bg-pink-gradient transition-all shadow-lg"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
      </div>
      {/* Main carousel container */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-10 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-8 items-center h-full">
            {/* Text content column - centered */}
            <div
              className={`text-center mx-auto transition-all duration-300 ease-out ${getContentAnimationClass()}`}
            >
              {/* Badge */}
              <div className="inline-flex items-center py-[6px] px-6 bg-pink-500 bg-opacity-30 backdrop-blur-sm border border-pink-500 border-opacity-40 rounded-[10px] mb-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center w-[28px] h-[28px] bg-white bg-opacity-20 rounded-full">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#FFF"
                    />
                  </svg>
                </div>
                <p className={`${styles.paragraph} ml-3`}>
                  <span className="text-white text-5xl font-semibold tracking-wide">
                    {currentQuote.title}
                  </span>
                </p>
              </div>

              {/* Heading */}
              <h1 className="font-poppins font-semibold text-[40px] xs:text-[48px] sm:text-[52px] md:text-[58px] lg:text-[64px] xl:text-[68px] text-white leading-[1.1] mb-6">
                {headingStart}{" "}
                {headingEnd && (
                  <span className="headend">{headingEnd}</span>
                )}
              </h1>

              {/* Description */}
              <p
                className={`${styles.paragraph} mx-auto max-w-[700px] mb-8 text-white text-3xl`}
              >
                {currentQuote.description}
              </p>

              {/* CTA button - below content */}
              {currentQuote.cta && (
                <div className="flex justify-center">
                  <a
                    href="#aboutus"
                    className="inline-flex items-center justify-center py-4 px-8 bg-pink-gradient font-poppins font-medium text-[18px] text-gray-800 outline-none border-2 rounded-[10px] hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    {currentQuote.cta}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Gradients */}
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[0] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 pink__gradient" />
      {/* Carousel controls */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Slide indicators */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentQuoteIndex === index
                        ? "w-8 bg-pink-500"
                        : "w-2 bg-gray-500 bg-opacity-50 hover:bg-opacity-80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleSlideChange("prev")}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-pink-gradient transition-all"
                aria-label="Previous slide"
                disabled={isTransitioning}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <button
                onClick={() => handleSlideChange("next")}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-pink-gradient transition-all"
                aria-label="Next slide"
                disabled={isTransitioning}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;