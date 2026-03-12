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
    <div className="px-4 md:px-8 lg:px-12 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {allblogs.map((blog, index) => {
        const date = new Date(blog?.created_at);
        const formattedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}, ${date.getFullYear()}`;

        return (
          <div
            key={index}
            className="bg-[var(--card_bg)] border rounded-xl flex flex-col overflow-hidden"
            style={{ borderColor: "var(--border_color)" }}
          >
            {/* Blog Image */}
            <div className="w-full h-48 sm:h-56 overflow-hidden">
              <img
                src={blog.blog_image || "https://via.placeholder.com/400x250?text=No+Image"}
                alt={blog.blog_title}
                className="w-full h-full object-cover"
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
                className="mt-auto inline-block text-[var(--main_color)] font-semibold"
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