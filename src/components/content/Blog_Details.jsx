import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const Blog_Detail = ({ base_url }) => {
    const [Blog_Detail, setBlog_Detail] = useState({});
    const { id } = useParams();
    const path = `/api/blog/${id}`;

    const API_URL = `${base_url}${path}`;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                setBlog_Detail(response.data);
                console.log(response.data);
            }
            catch (error) {
                console.error("Error fetching blog:", error);
            }
        }
        fetchData();
    }, [API_URL]);
    return (
        <>
            {/* <div className="container mx-auto p-6">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-contain bg-no-repeat bg-start h-64 p-4" style={{ backgroundImage: `url(${base_url}${Blog_Detail?.blog_image})` }}>
                        <div className="flex justify-center">
                            <h1 className="text-3xl font-bold text-gray-900">{Blog_Detail.blog_title}</h1>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center mt-2">
                            <span className="text-gray-600 text-sm">{Blog_Detail?.blog_author}</span>
                        </div>
                        <div className="mt-4 text-gray-700 text-base" dangerouslySetInnerHTML={{ __html: Blog_Detail.blog_description }}></div>
                        <span className=" text-gray-600 text-sm">{new Intl.DateTimeFormat('en-us').format(Date.now())}</span>
                    </div>
                </div>
            </div> */}

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-col">
                    <div className="lg:w-4/6 mx-auto">
                        <div className="rounded-lg h-64 overflow-hidden">
                            <img alt="content" className="object-contain object-center h-full w-full" src={`${base_url}${Blog_Detail?.blog_image}`} />
                        </div>
                        <div className="flex flex-col sm:flex-row mt-10">
                            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                    
                                </div>
                                <div className="flex flex-col items-center text-center justify-center">
                                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{Blog_Detail?.blog_author}</h2>
                                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                                    
                                </div>
                            </div>
                            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                                <p className="leading-relaxed text-lg mb-4" dangerouslySetInnerHTML={{ __html: Blog_Detail.blog_description }}></p>
                                <a className="text-indigo-500 inline-flex items-center">
                                    
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

Blog_Detail.propTypes = {
    base_url: PropTypes.string.isRequired,
}

export default Blog_Detail;