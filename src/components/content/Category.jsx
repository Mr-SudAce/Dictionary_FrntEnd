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
    <div className="mx-auto py-8">
      {Object.entries(groupedPosts).map(([catId, categoryData]) => (
        <div key={catId} className="mb-12">
          {/* Category Title */}
          <h2
            className="text-3xl font-semibold mb-6"
            style={{ color: "var(--main_color)" }}
          >
            {categoryData.title}
          </h2>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.posts.map((post) => (
              <div
                key={post.id}
                className="bg-[var(--card_bg)] border rounded-xl flex flex-col overflow-hidden"
                style={{ borderColor: "var(--border_color)" }}
              >
                {/* Image */}
                <div className="w-full h-48 sm:h-56 overflow-hidden">
                  <img
                    src={post.image || "https://via.placeholder.com/400x250?text=No+Image"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3
                    className="text-lg sm:text-xl font-bold mb-2 line-clamp-2"
                    style={{ color: "var(--text_color)" }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="text-sm sm:text-base mb-4 line-clamp-3 text-justify"
                    style={{ color: "var(--secondary_text)" }}
                    dangerouslySetInnerHTML={{ __html: post.full_desc }}
                  ></p>

                  <Link
                    to={`post/${post.id}`}
                    className="mt-auto font-semibold"
                    style={{ color: "var(--main_color)" }}
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