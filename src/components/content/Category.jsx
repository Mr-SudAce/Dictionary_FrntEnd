import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = ({ base_url }) => {
  const [posts, setPosts] = useState([]);
  const API_URL = `${base_url}/api/all/post/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching category:", error);
        alert("Unable to fetch posts. Please try again later.");
      }
    };
    fetchData();
  }, [API_URL]);

  // Group posts by category
  const groupedPosts = posts.reduce((acc, item) => {
    const catId = item.post_Cat.cat_order;
    const catTitle = item.post_Cat.cat_title;

    if (!acc[catId]) acc[catId] = { title: catTitle, posts: [] };
    acc[catId].posts.push(item);
    return acc;
  }, {});

  return (
    <div className="mx-auto border-t-2 border-gray-300">
      {Object.entries(groupedPosts).map(([catId, categoryData]) => (
        <div key={catId} className="mb-12 px-4 lg:px-8">
          <h2 className="text-3xl font-semibold mb-6">{categoryData.title}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.posts.map((post) => (
              <div
                key={post.id}
                className="bg-[var(--card_bg)] border-2 border-[var(--main_color)] rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="w-full h-48 sm:h-56 overflow-hidden">
                  <img
                    src={post.image || "https://via.placeholder.com/400x250?text=No+Image"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-[var(--text_color)] line-clamp-2">
                    {post.title}
                  </h3>
                  <p
                    className="text-[var(--secondary_text)] text-sm sm:text-base mb-4 line-clamp-3 text-justify"
                    dangerouslySetInnerHTML={{ __html: post.full_desc }}
                  ></p>
                  <Link
                    to={`post/${post.id}`}
                    className="mt-auto text-[var(--main_color)] font-semibold hover:text-[var(--hover_color)] transition-colors duration-300"
                  >
                    Read more &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

Category.propTypes = {
  base_url: PropTypes.string.isRequired,
};

export default Category;