import { useEffect, useState } from 'react';
import axios from "axios";

const Features = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [features, setFeature] = useState([]);

  const base_url = "http://127.0.0.1:8000";
  const path = "/api/post/";
  const API_url = `${base_url}${path}`;

  useEffect(() => {
    axios
      .get(API_url)
      .then(res => {
        setFeature(res.data)
      })
      .catch(err => {
        console.log("Error fetching API data", err);
      })
  }, [API_url]);

  const toggleReadMore = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) // Remove index if it's already expanded
        : [...prev, index] // Add index if it's not already expanded
    );
  };

  return (
    <section className="bg-blue-100 py-12">
      <div className="container mx-auto px-6 sm:px-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Our Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center sm:text-left">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">
                <img
                  src={feature.image ? `${base_url}${feature.image}` : `${base_url}/media/images/default.jpg`}
                  alt={feature.title || "Feature Image"}
                  className="mx-auto sm:mx-0 w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {expandedIndexes.includes(index)
                  ?
                  feature.full_desc
                  :
                  feature.description
                }
              </p>

              <button
                onClick={() => toggleReadMore(index)}
                className="text-blue-500 hover:underline mt-4 focus:outline-none"
              >
                {expandedIndexes.includes(index) ? 'Show Less' : 'Read More'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;