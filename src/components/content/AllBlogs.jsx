import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBlogs = ({ base_url }) => {
    const [allblogs, setAllBlogs] = useState([]);

    const path = "/api/all/blog/";
    const API_URL = `${base_url}${path}`;
    console.log("blogs data", API_URL);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setAllBlogs(data);
                console.log("blogs data", data);
            }
            catch (err) {
                console.log("Error Fetching Blog API Data", err);
            }
        }
        fetchData();
    }, [API_URL])

    const date = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const today = `${day} ${month}, ${year}`;

    return (
        <>
            <div className="flex flex-col m-3 space-y-4">
                {allblogs.map((allblog, index) => (
                    <section key={index} className="text-gray-600 body-font overflow-hidden">
                        <div className="container px-5 py-8 mx-auto">
                            <div className="-my-8 divide-y-2 divide-gray-100">
                                <div className="py-8 flex flex-wrap md:flex-nowrap flex-col">
                                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                        <span className="font-semibold title-font text-gray-700">{allblog?.blog_Cat.cat_title}</span>
                                        <span className="mt-1 text-gray-500 text-sm">{today} </span>
                                    </div>
                                    <div className="md:flex-grow">
                                        <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{allblog.blog_title}</h2>
                                        <p className="leading-relaxed" dangerouslySetInnerHTML={{__html: `${allblog.blog_description.substring(0, 200).split(" ").slice(0, -1).join(" ")}...`,}}></p>
                                        <Link to={`/blog/${allblog.id}`} className="inline-flex items-center">Learn More..</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div >
        </>
    );
}

AllBlogs.propTypes = {
    base_url: PropTypes.string.isRequired,
};


export default AllBlogs;
