import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = ({ base_url }) => {
    const [post, setPost] = useState([]);
    const path = "/api/all/post/";
    const API_URL = `${base_url}${path}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching category:", error);
                alert("Unable to fetch posts. Please try again later.");
            }
        };
        fetchData();
    }, [API_URL]);

    // Group posts by category
    const groupPostsByCategory = () => {
        const grouped = {};
        post.forEach((item) => {
            const categoryId = item.post_Cat.cat_order;
            const categoryTitle = item.post_Cat.cat_title;

            if (!grouped[categoryId]) {
                grouped[categoryId] = {
                    title: categoryTitle,
                    posts: [],
                };
            }
            grouped[categoryId].posts.push(item);
        });
        return grouped;
    };

    const groupedPosts = groupPostsByCategory();

    return (
        <>
            <div className="mx-auto border-t-2 border-gray-300">
                {Object.entries(groupedPosts).map(([categoryId, categoryData]) => (
                    <div key={categoryId} className="mb-8 px-4 lg:px-8">
                        <p className="text-start text-3xl font-semibold my-4">
                            {categoryData.title}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryData.posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-gray-300 shadow-md rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 items-center p-4 gap-4"
                                >
                                    <img
                                        src={`${base_url}${post.image}`}
                                        alt={post.title}
                                        className="object-cover w-full h-[200px] rounded-lg"
                                    />
                                    <div className="px-2">
                                        <h1 className="text-lg font-semibold mb-2">{post.title}</h1>
                                        <p
                                            className="text-sm md:text-base font-medium line-clamp-3 text-justify"
                                            dangerouslySetInnerHTML={{ __html: post.full_desc }}
                                        ></p>
                                        <Link
                                            to={`post/${post.id}`}
                                            className="text-blue-600 font-medium underline mt-2 block"
                                        >
                                            Read more...
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
};

Category.propTypes = {
    base_url: PropTypes.string.isRequired,
};

export default Category;
