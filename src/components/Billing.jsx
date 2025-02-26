import React, { useState, useEffect } from "react";
import styles, { layout } from "../style";

const RoyaltyCalculator = () => {
  // State variables
  const [platform, setPlatform] = useState("spotify");
  const [currency, setCurrency] = useState("USD");
  const [monthlyStreams, setMonthlyStreams] = useState(10000);
  const [country, setCountry] = useState("US");
  const [estimatedRevenue, setEstimatedRevenue] = useState(0);

  // Royalty rates object by platform and country (USD per 1000 streams)
  const royaltyRates = {
    spotify: {
      US: 4.0,
      UK: 3.8,
      CA: 3.7,
      AU: 3.6,
      DE: 3.5,
      FR: 3.4,
      ES: 3.3,
      IT: 3.2,
      JP: 3.1,
      BR: 2.8,
      MX: 2.7,
      IN: 2.2,
      KR: 3.0,
      NL: 3.5,
      SE: 3.6,
      NO: 3.7,
      DK: 3.6,
      NZ: 3.5,
      SG: 3.3,
      ZA: 2.6,
      other: 3.0
    },
    apple: {
      US: 5.5,
      UK: 5.3,
      CA: 5.2,
      AU: 5.0,
      DE: 5.1,
      FR: 5.0,
      ES: 4.9,
      IT: 4.8,
      JP: 4.7,
      BR: 4.3,
      MX: 4.2,
      IN: 3.7,
      KR: 4.5,
      NL: 5.0,
      SE: 5.1,
      NO: 5.2,
      DK: 5.1,
      NZ: 5.0,
      SG: 4.8,
      ZA: 4.1,
      other: 4.5
    },
    youtube: {
      US: 2.0,
      UK: 1.9,
      CA: 1.8,
      AU: 1.7,
      DE: 1.8,
      FR: 1.7,
      ES: 1.6,
      IT: 1.6,
      JP: 1.5,
      BR: 1.3,
      MX: 1.2,
      IN: 0.8,
      KR: 1.4,
      NL: 1.7,
      SE: 1.8,
      NO: 1.8,
      DK: 1.7,
      NZ: 1.6,
      SG: 1.5,
      ZA: 1.1,
      other: 1.5
    },
    amazon: {
      US: 4.2,
      UK: 4.0,
      CA: 3.9,
      AU: 3.8,
      DE: 3.9,
      FR: 3.8,
      ES: 3.7,
      IT: 3.6,
      JP: 3.5,
      BR: 3.1,
      MX: 3.0,
      IN: 2.5,
      KR: 3.3,
      NL: 3.8,
      SE: 3.9,
      NO: 3.9,
      DK: 3.8,
      NZ: 3.7,
      SG: 3.5,
      ZA: 2.9,
      other: 3.5
    },
    tidal: {
      US: 6.0,
      UK: 5.8,
      CA: 5.7,
      AU: 5.5,
      DE: 5.6,
      FR: 5.5,
      ES: 5.4,
      IT: 5.3,
      JP: 5.2,
      BR: 4.8,
      MX: 4.7,
      IN: 4.2,
      KR: 5.0,
      NL: 5.5,
      SE: 5.6,
      NO: 5.7,
      DK: 5.6,
      NZ: 5.5,
      SG: 5.3,
      ZA: 4.6,
      other: 5.0
    },
    other: {
      US: 3.5,
      UK: 3.3,
      CA: 3.2,
      AU: 3.1,
      DE: 3.2,
      FR: 3.1,
      ES: 3.0,
      IT: 2.9,
      JP: 2.8,
      BR: 2.4,
      MX: 2.3,
      IN: 1.8,
      KR: 2.7,
      NL: 3.1,
      SE: 3.2,
      NO: 3.2,
      DK: 3.1,
      NZ: 3.0,
      SG: 2.8,
      ZA: 2.2,
      other: 2.8
    }
  };

  // Currency conversion rates (from USD)
  const currencyRates = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.78,
    JPY: 151.49,
    AUD: 1.52,
    CAD: 1.36,
  };

  // Calculate estimated revenue whenever inputs change
  useEffect(() => {
    // Get the appropriate royalty rate based on platform and country
    const currentRoyaltyRate = royaltyRates[platform][country] || royaltyRates[platform].other;
    
    const baseRevenue = (monthlyStreams / 1000) * currentRoyaltyRate;
    const convertedRevenue = baseRevenue * currencyRates[currency];
    setEstimatedRevenue(convertedRevenue.toFixed(2));
  }, [platform, currency, monthlyStreams, country]);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Currency symbols
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
  };

  return (
    <section id="royalty-calculator" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <video
          src="https://cdn.pixabay.com/video/2017/03/20/8453-209292199_tiny.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full relative z-10 rounded-xl object-cover"
        />
        {/* gradient start */}
        <div className="absolute z-3 -left-1/2 top-0 w-1/2 h-1/2 rounded-full white__gradient" />
        <div className="absolute z-0 w-1/2 h-1/2 -left-1/2 bottom-0 rounded-full pink__gradient" />
        {/* gradient end */}
      </div>

      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Music Royalty <br className="sm:block hidden" /> Calculator
        </h2>
        <p className={`${styles.paragraph} max-w-lg mt-5`}>
          Estimate your music streaming revenue based on your monthly streams
          across different platforms and regions.
        </p>

        <div className="mt-8 bg-black-gradient-2 rounded-lg p-6 w-full max-w-md">
          {/* Platform selection */}
          <div className="mb-4">
            <label className="text-white text-base mb-2 block">
              Streaming Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-3 rounded-md bg-primary border border-dimWhite text-white"
            >
              <option value="spotify">Spotify</option>
              <option value="apple">Apple Music</option>
              <option value="youtube">YouTube Music</option>
              <option value="amazon">Amazon Music</option>
              <option value="tidal">Tidal</option>
              <option value="other">Other Platform</option>
            </select>
          </div>

          {/* Currency */}
          <div className="mb-4">
            <label className="text-white text-base mb-2 block">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-3 rounded-md bg-primary border border-dimWhite text-white"
            >
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
              <option value="GBP">GBP (British Pound)</option>
              <option value="JPY">JPY (Japanese Yen)</option>
              <option value="AUD">AUD (Australian Dollar)</option>
              <option value="CAD">CAD (Canadian Dollar)</option>
            </select>
          </div>

          {/* Monthly Streams */}
          <div className="mb-4">
            <label className="text-white text-base mb-2 block">
              Monthly Streams
            </label>
            <input
              type="number"
              value={monthlyStreams}
              onChange={(e) =>
                setMonthlyStreams(Math.max(0, parseInt(e.target.value) || 0))
              }
              className="w-full p-3 rounded-md bg-primary border border-dimWhite text-white"
              min="0"
            />
          </div>

          {/* Country Selection */}
          <div className="mb-4">
            <label className="text-white text-base mb-2 block">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-3 rounded-md bg-primary border border-dimWhite text-white"
            >
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="ES">Spain</option>
              <option value="IT">Italy</option>
              <option value="JP">Japan</option>
              <option value="BR">Brazil</option>
              <option value="MX">Mexico</option>
              <option value="IN">India</option>
              <option value="KR">South Korea</option>
              <option value="NL">Netherlands</option>
              <option value="SE">Sweden</option>
              <option value="NO">Norway</option>
              <option value="DK">Denmark</option>
              <option value="NZ">New Zealand</option>
              <option value="SG">Singapore</option>
              <option value="ZA">South Africa</option>
              <option value="other">Other Countries</option>
            </select>
          </div>

          {/* Results */}
          <div className="mt-6 p-4 bg-discount-gradient rounded-lg">
            <h3 className="text-white text-lg font-semibold mb-2">
              Estimated Monthly Revenue
            </h3>
            <div className="flex items-center">
              <span className="text-white text-3xl font-bold">
                {currencySymbols[currency]}
                {formatNumber(estimatedRevenue)}
              </span>
            </div>
            <p className="text-dimWhite text-xs mt-2">
              Royalty rate: {royaltyRates[platform][country] || royaltyRates[platform].other} USD per 1000 streams | Country: {country}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoyaltyCalculator;