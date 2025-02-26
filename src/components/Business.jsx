import { useState, useEffect } from "react";
import styles from "../style";

// Define features based on provided content
const features = [
  {
    id: "feature-1",
    icon: "global",
    title: "Global Distribution",
    content:
      "Reach a global audience with our extensive DSP network, protect your music for free, and keep 100% of your royalty.",
  },
  {
    id: "feature-2",
    icon: "card",
    title: "Business Cards & Payments",
    content:
      "Manage your music career like a pro with business accounts, payment cards, and financial tools designed for music creators.",
  },
  {
    id: "feature-3",
    icon: "handshake",
    title: "Sync & Partnerships",
    content:
      "We help you unlock new revenue streams through sync deals and partnerships.",
  },
  {
    id: "feature-4",
    icon: "money",
    title: "Funding",
    content:
      "Get royalty advances on your terms – support your lifestyle, career growth, or meet upfront costs to attend live shows.",
  },
  {
    id: "feature-5",
    icon: "chart",
    title: "Marketing & Analytics",
    content:
      "Use AI-driven digital marketing and influencer partnerships to amplify social reach and engage more fans.",
  },
];

// Icon components
const IconComponent = ({ name }) => {
  const icons = {
    global: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[50%] h-[50%] text-teal-200"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    card: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[50%] h-[50%] text-teal-200"
      >
        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
      </svg>
    ),
    handshake: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[50%] h-[50%] text-teal-200"
      >
        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
      </svg>
    ),
    money: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[50%] h-[50%] text-teal-200"
      >
        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
        <circle cx="12" cy="12" r="2"></circle>
        <path d="M6 12h.01M18 12h.01"></path>
      </svg>
    ),
    chart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[50%] h-[50%] text-teal-200"
      >
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
  };

  return icons[name] || null;
};

// Mobile Feature Card
const MobileFeatureCard = ({ icon, title, content, isActive, onClick }) => (
  <div
    className={`w-full bg-black-gradient-2 rounded-xl p-4 mb-4 shadow-lg transition-all duration-300 ${
      isActive ? "border-2 border-teal-200" : "border border-blue-gradient"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center mb-2">
      <div
        className={`w-[50px] h-[50px] rounded-full flex justify-center items-center mr-4 ${
          isActive ? "bg-blue-gradient shadow-lg" : "bg-dimBlue"
        }`}
      >
        <IconComponent name={icon} />
      </div>
      <h4 className="font-poppins font-semibold text-white text-[16px] leading-tight">
        {title}
      </h4>
    </div>
    {isActive && (
      <p className="font-poppins font-normal text-dimWhite text-[14px] leading-tight pl-16">
        {content}
      </p>
    )}
  </div>
);

// Desktop Feature Card
const DesktopFeatureCard = ({ icon, title, content, isActive }) => (
  <div
    className={`flex flex-col items-center transition-all duration-500 ${
      isActive ? "scale-110 z-20" : "scale-90 opacity-60"
    }`}
    style={{
      width: isActive ? "250px" : "200px",
      height: "auto",
      maxHeight: isActive ? "300px" : "200px",
    }}
  >
    <div
      className={`w-[70px] h-[70px] rounded-full flex justify-center items-center mb-4 ${
        isActive ? "bg-blue-gradient shadow-lg" : "bg-dimBlue"
      }`}
    >
      <IconComponent name={icon} />
    </div>
    <div
      className="text-center bg-black-gradient-2 rounded-xl p-4 shadow-lg"
      style={{ minHeight: isActive ? "120px" : "80px" }}
    >
      <h4 className="font-poppins font-semibold text-white text-[16px] leading-tight mb-2">
        {title}
      </h4>
      {isActive && (
        <p className="font-poppins font-normal text-dimWhite text-[14px] leading-tight">
          {content}
        </p>
      )}
    </div>
  </div>
);

// Circular Features Component (Desktop)
const CircularFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-[850px] w-full max-w-[1000px] mx-auto">
      {/* Animated background elements */}
      <div className="absolute w-[600px] h-[600px] rounded-full border-2 border-blue-gradient opacity-10 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full border-2 border-blue-gradient opacity-15 animate-pulse-slow"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full border-2 border-blue-gradient opacity-20 animate-spin-slow"></div>

      {/* Glowing effect behind center */}
      <div className="absolute w-[260px] h-[260px] rounded-full bg-blue-gradient opacity-20 blur-xl"></div>

      {/* Center content */}
      <div className="z-10 text-center bg-black-gradient rounded-full w-[220px] h-[220px] flex items-center justify-center shadow-xl border border-blue-gradient">
        <h3 className="font-poppins font-bold text-gradient text-[22px] leading-tight px-4">
          Everything You Need In One Platform
        </h3>
      </div>

      {/* Features positioned around the circle */}
      {features.map((feature, index) => {
        // Calculate position around circle
        const angle = index * ((2 * Math.PI) / features.length) - Math.PI / 2; // Start from top
        const radius = 320; // Increased distance from center to provide more space
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={feature.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 cursor-pointer"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transition: "all 0.7s ease-in-out",
              zIndex: activeFeature === index ? 30 : 10,
            }}
            onClick={() => setActiveFeature(index)}
          >
            <DesktopFeatureCard {...feature} isActive={activeFeature === index} />
          </div>
        );
      })}

      {/* Connection lines from center to features */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#33bbcf" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#33bbcf" stopOpacity="1" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {features.map((feature, index) => {
          const angle = index * ((2 * Math.PI) / features.length) - Math.PI / 2;
          const innerRadius = 110;
          const outerRadius = 260;
          const centerX = 500; // center X coordinate
          const centerY = 400; // center Y coordinate
          const x1 = Math.cos(angle) * innerRadius + centerX;
          const y1 = Math.sin(angle) * innerRadius + centerY;
          const x2 = Math.cos(angle) * outerRadius + centerX;
          const y2 = Math.sin(angle) * outerRadius + centerY;

          return (
            <line
              key={`line-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#lineGradient)"
              strokeWidth={activeFeature === index ? "3" : "1"}
              opacity={activeFeature === index ? "1" : "0.3"}
              filter={activeFeature === index ? "url(#glow)" : ""}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>

      {/* Animated particle effects */}
      <div className="particle-container">
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-blue-gradient opacity-30"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Mobile Features List
const MobileFeaturesList = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto rotate through features on mobile too
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-6 py-8">
      {/* Center content */}
      <div className="mx-auto text-center mb-8">
        <div className="bg-black-gradient rounded-2xl w-full py-6 flex items-center justify-center shadow-xl border border-blue-gradient">
          <h3 className="font-poppins font-bold text-gradient text-[22px] leading-tight px-4">
            Everything You Need In One Platform
          </h3>
        </div>
      </div>

      {/* Features list */}
      <div className="space-y-4">
        {features.map((feature, index) => (
          <MobileFeatureCard
            key={feature.id}
            {...feature}
            isActive={activeFeature === index}
            onClick={() => setActiveFeature(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Responsive Business Component
const Business = () => {
  return (
    <section
      id="features"
      className="flex w-full justify-center items-center py-16 bg-primary"
    >
      {/* Desktop version - circular layout */}
      <div className="hidden md:block w-full">
        <CircularFeatures />
      </div>

      {/* Mobile version - card list */}
      <div className="block md:hidden w-full">
        <MobileFeaturesList />
      </div>
    </section>
  );
};

export default Business;