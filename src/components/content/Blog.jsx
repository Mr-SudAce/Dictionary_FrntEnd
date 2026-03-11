import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Blog = ({ base_url }) => {
  const [blog, setBlog] = useState([]);
  const path = "/api/all/blog/";
  const API_URL = `${base_url}${path}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL)
                const data = await response.json();
                setBlog(data);
            }
            catch (err) {
                console.log("Error Fetching Blog API Data", err);
            }
        }
        fetchData();
    }, [API_URL]);

  return (
    <div className="relative w-[95%] mx-auto pb-4">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text_color)]">
          Blog
        </h1>
        <Link
          to={`/allblog/`}
          className="text-[var(--main_color)] border-2 border-[var(--main_color)] px-3 py-1 rounded font-medium transition-colors duration-300 hover:bg-[var(--main_color)] hover:text-[var(--text_color)]"
        >
          See More Blogs
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
        {blog.length > 0 ? (
          blog.slice(0, 4).map((item, index) => (
            <section
              key={index}
              className="bg-[var(--card_bg)] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="w-full h-48 md:h-52 overflow-hidden">
                <img
                  alt={item.blog_title}
                  src={item.blog_image ? `${item.blog_image}` : "https://via.placeholder.com/400x300?text=No+Image"}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h2 className="text-xl md:text-2xl font-semibold text-[var(--text_color)] mb-2">
                  {item.blog_title}
                </h2>
                <p className="text-[var(--secondary_text)] text-sm mb-3">
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        item.blog_description.length > 80
                          ? `${item.blog_description.substring(0, 80)}...`
                          : item.blog_description,
                    }}
                  />
                </p>

                <div className="mt-auto flex items-center justify-between text-sm">
                  <p className="text-[var(--secondary_text)]">
                    By: <span className="font-medium text-[var(--main_color)]">{item.blog_author}</span>
                  </p>
                  <Link
                    to={`/blog/${item.id}`}
                    className="text-[var(--main_color)] font-medium hover:text-[var(--hover_color)] transition-colors duration-300"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </section>
          ))
        ) : (
          <p className="col-span-full text-center text-2xl text-[var(--secondary_text)] py-20">
            No Blogs Found
          </p>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  base_url: PropTypes.string.isRequired,
};

export default Blog;