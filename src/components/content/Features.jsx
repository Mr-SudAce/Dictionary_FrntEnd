
import axios from "axios";
import { useEffect, useState } from 'react';


const Features = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [article, setArticle] = useState([]);

  let API_Key = "25da49ba943b4dac864f22b71ca667e5";
  let API_URL = `https://newsapi.org/v2/everything?q=tesla&from=2024-11-16&sortBy=publishedAt&apiKey=${API_Key}`;

  useEffect(() => {
    const fetchresult = async () => {
      try {
        const response = await axios.get(API_URL) // Fetch data from the API
        console.log(response.data);
        setArticle(response.data.articles);
      } catch (error) {
        console.log("data not found", error);
      }
    };
    fetchresult();
  }, [API_Key, API_URL]);


  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <div className="container-fluid py-8 justify-center items-center" style={{
        backgroundColor: "var(--main_color)",
      }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{
          color: "var(--text_color)",
        }}>
          Our Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {article.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" style={{
                backgroundColor: "var(--main_bg)",
              }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2"
                style={{
                  color: "var(--main_color)",
                }}>
                {feature.title}
              </h3>
              <p className="text-gray-950">
                {expandedIndex === index
                  ? feature.fullDescription
                  : feature.description}
              </p>
              <button
                onClick={() => toggleReadMore(index)}
                className=" hover:underline mt-1 focus:outline-none"
                style={{
                  fontSize: "15px",
                  color: "var(--main_color)",
                }}
              >
                {expandedIndex === index ? 'Show Less' : 'Read More >'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Features;
