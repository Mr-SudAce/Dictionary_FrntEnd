import PropTypes from 'prop-types';
import Slider from "react-slick";
import { FaBookOpen, FaVolumeUp, FaQuoteLeft, FaBrain, FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Features = ({ base_url }) => {
  const features = [
    {
      title: "Word Definitions",
      description: "Learn the exact meanings of words with clear explanations and examples.",
      icon: <FaBookOpen size={36} className="text-white" />,
    },
    {
      title: "Pronunciation Guide",
      description: "Hear how words are pronounced correctly with audio clips.",
      icon: <FaVolumeUp size={36} className="text-white" />,
    },
    {
      title: "Example Sentences",
      description: "See words used in real sentences to understand context.",
      icon: <FaQuoteLeft size={36} className="text-white" />,
    },
    {
      title: "Vocabulary Builder",
      description: "Track and review new words to expand your vocabulary efficiently.",
      icon: <FaBrain size={36} className="text-white" />,
    },
    {
      title: "Daily Word Challenge",
      description: "Test your knowledge with a fun daily word quiz or challenge.",
      icon: <FaStar size={36} className="text-white" />,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-12 bg-[var(--main_bg)] border-t">
      <div className="container mx-auto px-6 sm:px-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: "var(--text_color)" }}>
          Our Features
        </h2>

        <Slider {...settings}>
          {features.map((feature, index) => (
            <div key={index} className="px-3">
              <div
                className="flex flex-col items-center text-center p-6 rounded-xl transition-transform hover:scale-105 duration-300"
                style={{ backgroundColor: "var(--card_bg)", border: `1px solid var(--border_color)` }}
              >
                <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-[var(--main_color)]">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[var(--main_color)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--secondary_text)] text-sm sm:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

Features.propTypes = {
  base_url: PropTypes.string,
};

export default Features;