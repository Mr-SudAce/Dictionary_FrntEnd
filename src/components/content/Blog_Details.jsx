import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Blog_Detail = ({ base_url }) => {
  const [blogDetail, setBlogDetail] = useState({});
  const { id } = useParams();
  const API_URL = `${base_url}/api/all/blog/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setBlogDetail(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchData();
  }, [API_URL]);

  const defaultImage = "https://picsum.photos/id/247/1080";

  return (
    <section
      className="w-full px-4 md:px-8 lg:px-16 py-12"
      style={{ backgroundColor: "var(--main_bg)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Blog Image */}
        <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border_color)" }}>
          <img
            alt={blogDetail.blog_title || "Blog Image"}
            src={blogDetail.blog_image || defaultImage}
            className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
          />
        </div>

        {/* Author & Content */}
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Author Info */}
          <div className="sm:w-1/3 text-center sm:pr-6 sm:py-4">
            <div
              className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: "var(--card_bg)", color: "var(--main_color)" }}
            >
              {blogDetail.blog_author?.[0] || "A"}
            </div>
            <h2
              className="mt-4 text-lg font-medium"
              style={{ color: "var(--main_color)" }}
            >
              {blogDetail.blog_author || "Anonymous"}
            </h2>
            <div
              className="w-12 h-1 rounded mx-auto mt-2"
              style={{ backgroundColor: "var(--accent_color)" }}
            ></div>
          </div>

          {/* Blog Content */}
          <div className="sm:w-2/3 sm:pl-6 sm:py-4 border-t sm:border-t-0 sm:border-l" style={{ borderColor: "var(--border_color)" }}>
            <h1
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: "var(--text_color)" }}
            >
              {blogDetail.blog_title}
            </h1>
            <p
              className="leading-relaxed text-base md:text-lg"
              style={{ color: "var(--secondary_text)" }}
              dangerouslySetInnerHTML={{ __html: blogDetail.blog_description }}
            ></p>
          </div>
        </div>
      </div>
    </section>
  );
};

Blog_Detail.propTypes = {
  base_url: PropTypes.string.isRequired,
};

export default Blog_Detail;