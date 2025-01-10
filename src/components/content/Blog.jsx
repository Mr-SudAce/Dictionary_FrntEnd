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
            <div className="position-relative lg:w-3/4 md:w-3/4 px-2">
                <h1>Blog</h1>
                <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2 pb-5">


                    {blog.length > 0 ? (
                        <>
                            {blog.slice(0, 4).map((blog, index) => (
                                <section key={index} className="bg-gray-300 text-gray-600 body-font rounded-lg">
                                    <div className="flex flex-col p-2 h-full">
                                        <h1 className="text-2xl text-dark">{blog.blog_title}</h1>
                                        <div className="rounded-lg overflow-hidden w-full">
                                            <img alt="content" className="object-cover object-center h-48 w-full p-3" src={`${base_url}${blog.blog_image}`} />
                                        </div>
                                                <Link to={`/blog/${blog.id}`} className="text-decoration-none text-dark items-center justify-end flex text-md mt-2">
                                        <div className="text-center">
                                            <p className="leading-relaxed text-gray-900 text-lg m-0 hove:text-blue-300">
                                                {blog.blog_description.length > 50 ? (
                                                    <span dangerouslySetInnerHTML={{ __html: `${blog.blog_description.substring(0, 50)}...` }}></span>
                                                ) : (
                                                    <span dangerouslySetInnerHTML={{ __html: blog.blog_description }}></span>
                                                )}
                                            </p>
                                            <p className="text-sm items-center justify-end flex text-gray-600 m-0">By: <span>{blog.blog_author}</span> </p>
                                        </div>
                                        {/* <IoMdArrowRoundForward /> */}
                                        </Link>
                                        {/* <Link to={`/blog/${blog.id}`} className="text-decoration-none text-dark items-center justify-end flex text-md mt-2"><IoMdArrowRoundForward /></Link> */}
                                    </div>
                                </section>
                            ))}
                            <Link to={`/allblog/`} className="position-absolute right-0 bottom-0 md:right-0 text-decoration-none font-bold text-gray-600 p-2 hover:text-gray-800">See More</Link>
                        </>
                    ) : (
                        <p className="absolute flex justify-center w-[98%] items-center h-[455px] text-2xl">No Blog</p>
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