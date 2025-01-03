import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const Cate_Detail = ({ base_url }) => {
    const [Cate_Detail, setCate_Detail] = useState({});
    const { id } = useParams();
    const path = `/api/post/${id}`;

    const API_URL = `${base_url}${path}`;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                setCate_Detail(response.data);
                console.log(response.data);
            }
            catch (error) {
                console.error("Error fetching category:", error);
            }
        }
        fetchData();
    }, [API_URL]);
    return (
        <>
            <div className="container mx-auto p-6">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-contain bg-no-repeat bg-center h-64 p-4" style={{ backgroundImage: `url(${base_url}${Cate_Detail?.image})` }}>
                        <div className="flex justify-end">
                            
                        </div>
                    </div>
                    <div className="p-4">
                        <h1 className="text-3xl font-bold text-gray-900">{Cate_Detail.title}</h1>
                        <div className="flex items-center mt-2">
                            <span className="ml-2 text-gray-600 text-sm">{Cate_Detail?.author}</span>
                        </div>
                        <div className="mt-4 text-gray-700 text-base" dangerouslySetInnerHTML={{ __html: Cate_Detail.full_desc }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

Cate_Detail.propTypes = {
    base_url: PropTypes.string.isRequired,
}

export default Cate_Detail;