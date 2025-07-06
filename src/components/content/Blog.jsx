import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { IoMdArrowRoundForward } from "react-icons/io";

const Blog = ({ base_url }) => {
    const [blog, setBlog] = useState([]);
    const path = "/api/all/blog/";
    const API_URL = `${base_url}${path}`


    // const limitword = 


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
        <>
            <div className="relative lg:w-3/4 md:w-3/4 px-2 mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Blog</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5 pb-8">

                    {blog.length > 0 ? (
                        <>
                            {blog.slice(0, 4).map((blog, index) => (
                                <section
                                    key={index}
                                    className="bg-white shadow-md hover:shadow-xl transition duration-300 rounded-lg overflow-hidden flex flex-col"
                                >
                                    <div className="w-full h-48 overflow-hidden">
                                        <img
                                            alt="blog"
                                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                            src={`${base_url}${blog.blog_image}`}
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col justify-between max-h-[20vh]">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.blog_title}</h2>
                                        <p className="text-gray-600 text-sm m-0">
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        blog.blog_description.length > 50
                                                            ? `${blog.blog_description.substring(0, 50)}...`
                                                            : blog.blog_description,
                                                }}
                                            ></span>
                                        </p>
                                        <div className="mt-auto flex items-center justify-between">
                                            <p className="text-sm text-gray-500">By: <span className="font-medium">{blog.blog_author}</span></p>
                                            <Link
                                                to={`/blog/${blog.id}`}
                                                className="text-blue-600 hover:text-blue-800 no-underline text-sm font-medium"
                                            >
                                                Read More →
                                            </Link>
                                        </div>
                                    </div>
                                </section>
                            ))}


                            <Link to={`/allblog/`} className="text-black transition duration-300 no-underline">
                                See More Blogs
                            </Link>
                        </>
                    ) : (
                        <p className="absolute flex justify-center items-center w-full h-[455px] text-2xl text-gray-400">
                            No Blogs Found
                        </p>
                    )}
                </div>
            </div>

        </>
    );
}



Blog.propTypes = {
    base_url: PropTypes.string.isRequired,
};


export default Blog;