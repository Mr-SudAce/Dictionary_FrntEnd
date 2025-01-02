import axios from "axios";
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Features = ({ base_url }) => {
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
    <section className="py-12 border-t" style={{ backgroundColor: "var(--main_bg)" }}>
      <div className="container mx-auto px-6 sm:px-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Our Features
        </h2>

        {features.length > 0 && (
          <Slider {...settings}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-transparent m-0"
              >
                <div className="p-3 bg-gray-300 rounded-lg shadow-md hover:shadow-lg m-2">
                  <img
                    src={feature.image ? `${base_url}${feature.image}` : `${base_url}/static/default.png`}
                    alt={feature.title || "Feature Image"}
                    className="mx-auto w-full h-60 object-contain rounded-lg"
                  />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <Link to={`post/${feature.id}`} className="text-blue-500 hover:underline">
                  Read More
                </Link>
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
