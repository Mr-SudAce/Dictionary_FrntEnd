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
    <section className="text-gray-700 body-font">
      <div className="container px-4 md:px-8 py-12 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          {/* Blog Image */}
          <div className="rounded-xl overflow-hidden">
            <img
              alt={blogDetail.blog_title || "Blog Image"}
              className="object-cover object-center w-full h-64 sm:h-80 md:h-96 transition-transform duration-300"
              src={blogDetail.blog_image || defaultImage}
            />
          </div>

          {/* Blog Author & Content */}
          <div className="flex flex-col sm:flex-row mt-10 gap-6 sm:gap-8">
            {/* Author Info */}
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-24 h-24 rounded-full mx-auto bg-gray-200 text-gray-400 flex items-center justify-center text-xl font-bold">
                {blogDetail.blog_author?.[0] || "A"}
              </div>
              <h2 className="mt-4 text-lg font-medium text-gray-900">
                {blogDetail.blog_author || "Anonymous"}
              </h2>
              <div className="w-12 h-1 bg-[var(--main_color)] rounded mt-2 mx-auto"></div>
            </div>

            {/* Blog Content */}
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text_color)]">
                {blogDetail.blog_title}
              </h1>
              <p
                className="leading-relaxed text-[var(--secondary_text)] text-base md:text-lg"
                dangerouslySetInnerHTML={{
                  __html: blogDetail.blog_description,
                }}
              ></p>
            </div>
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
