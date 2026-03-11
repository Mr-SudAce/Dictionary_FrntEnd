import PropTypes from "prop-types"; 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBlogs = ({ base_url }) => {
  const [allblogs, setAllBlogs] = useState([]);

  const API_URL = `${base_url}/api/all/blog/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setAllBlogs(data);
      } catch (err) {
        console.error("Error Fetching Blog API Data", err);
      }
    };
    fetchData();
  }, [API_URL]);

  return (
    <div className="px-4 md:px-8 lg:px-12 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {allblogs.map((blog, index) => {
        const date = new Date(blog?.created_at);
        const formattedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}, ${date.getFullYear()}`;

        return (
          <div
            key={index}
            className="bg-[var(--card_bg)] border-2 border-[var(--main_color)] rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden"
          >
            {/* Blog Image */}
            <div className="w-full h-48 sm:h-56 overflow-hidden">
              <img
                src={blog.blog_image || "https://via.placeholder.com/400x250?text=No+Image"}
                alt={blog.blog_title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Category & Date */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[var(--main_color)] font-semibold text-sm sm:text-base">
                  {blog?.blog_Cat?.cat_title || "Uncategorized"}
                </span>
                <span className="text-[var(--secondary_text)] text-xs sm:text-sm">
                  {formattedDate}
                </span>
              </div>

              {/* Blog Title */}
              <h2 className="text-[var(--text_color)] font-bold text-lg sm:text-xl md:text-2xl mb-2 line-clamp-2">
                {blog.blog_title}
              </h2>

              {/* Blog Description */}
              <p
                className="text-[var(--secondary_text)] text-sm sm:text-base mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: blog.blog_description,
                }}
              ></p>

              {/* Learn More Link */}
              <Link
                to={`/blog/${blog.id}`}
                className="mt-auto inline-block text-[var(--main_color)] font-semibold hover:text-[var(--hover_color)] transition-colors duration-300"
              >
                Learn More &rarr;
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

AllBlogs.propTypes = {
  base_url: PropTypes.string.isRequired,
};

export default AllBlogs;