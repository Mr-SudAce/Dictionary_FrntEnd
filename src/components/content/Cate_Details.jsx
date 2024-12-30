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
            <div className="grid justify-center max-w-[85%] mx-auto">
                <h1 className="text-center text-2xl md:text-3xl font-bold mb-4">{Cate_Detail.title}</h1>
                <div className="bg-gray-300 p-4 shadow-md rounded-lg w-[60rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    <div className="flex items-center justify-center">
                        <img
                            src={`${base_url}${Cate_Detail?.image}`}
                            alt={Cate_Detail?.title}
                            className="object-contain w-full max-h-[20rem] md:max-h-[30rem] rounded-lg"
                        />
                    </div>
                    <div className="p-4">
                        <p
                            className="text-base md:text-lg font-medium text-justify overflow-x-hidden overflow-y-auto max-h-[20rem]"
                            dangerouslySetInnerHTML={{ __html: Cate_Detail.full_desc }}
                        ></p>
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