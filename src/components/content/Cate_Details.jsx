import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Cate_Detail = ({ base_url }) => {
  const [Cate_Detail, setCate_Detail] = useState({});
  const { id } = useParams();
  const API_URL = `${base_url}/api/all/post/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setCate_Detail(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchData();
  }, [API_URL]);

  return (
    <div
      className="w-[95%] max-w-6xl mx-auto py-8"
      style={{ backgroundColor: "var(--main_bg)" }}
    >
      <div
        className="rounded-xl overflow-hidden border"
        style={{ borderColor: "var(--border_color)" }}
      >
        {/* Category Image */}
        <div
          className="w-full h-64 sm:h-80 md:h-96 bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${Cate_Detail?.image})` }}
        ></div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <h1
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--text_color)" }}
          >
            {Cate_Detail.title}
          </h1>

          {/* Author */}
          {Cate_Detail.author && (
            <p
              className="text-sm sm:text-base"
              style={{ color: "var(--secondary_text)" }}
            >
              By:{" "}
              <span style={{ color: "var(--main_color)" }}>
                {Cate_Detail.author}
              </span>
            </p>
          )}

          {/* Full Description */}
          <div
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--secondary_text)" }}
            dangerouslySetInnerHTML={{ __html: Cate_Detail.full_desc }}
          ></div>
        </div>
      </div>
    </div>
  );
};

Cate_Detail.propTypes = {
  base_url: PropTypes.string.isRequired,
};

export default Cate_Detail;
