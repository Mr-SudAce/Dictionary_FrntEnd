import { useEffect, useState } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import Slider from "react-slick"; // Import React Slick
import { Link } from 'react-router-dom';


const Features = ({ base_url }) => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [features, setFeature] = useState([]);

  const path = "/api/all/post/";
  const API_url = `${base_url}${path}`;

  useEffect(() => {
    axios
      .get(API_url)
      .then(res => {
        setFeature(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log("Error fetching Feature API data", err);
      })
  }, [API_url]);

  const toggleReadMore = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) // Remove index if it's already expanded
        : [...prev, index] // Add index if it's not already expanded
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 border-t" style={{
      backgroundColor: "var(--main_bg)",
    }}>
      <div className="container mx-auto px-6  sm:px-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Our Features
        </h2>

        {features.length > 0 && (
          <Slider {...settings}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-[100%] mx-4" // Add mx-4 for horizontal margin
            >
              <div className="">
                <div className="mb-4">
                  <img
                    src={feature.image ? `${base_url}${feature.image}` : `${base_url}/static/default.png`}
                    alt={feature.title || "Feature Image"}
                    className="mx-auto sm:mx-0 w-[100%] h-60 object-contain lg:object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 border-t border-black">
                  {feature.title}
                </h3>
                <p className="text-gray-600 m-0">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: expandedIndexes.includes(index)
                        ? feature.full_desc
                        : feature.description,
                    }}
                  ></span>
                </p>
                <Link to={`post/${feature.id}`}>More</Link>
                {/* <button
                  onClick={() => toggleReadMore(index)}
                  className="text-blue-500 text-lg focus:outline-none"
                >
                  {expandedIndexes.includes(index) ? "Less" : "More"}
                </button> */}
              </div>
            </div>
          ))}
        </Slider>
        
        )}
      </div>
    </section>
  );
};

Features.propTypes = {
  base_url: PropTypes.string.isRequired,
};

export default Features;
