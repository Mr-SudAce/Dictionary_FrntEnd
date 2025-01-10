import axios from "axios";
import { useEffect, useState } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import "../../main.css";

const WordsDetail = ({ dictionary_url }) => {
    const { id } = useParams();
    const [wordDetails, setWordDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    
    const API_URL = `${dictionary_url}/${id}`;

    useEffect(() => {
        setLoading(true);
        setNotFound(false);

        axios
            .get(API_URL)
            .then((res) => {
                const data = res.data[0];
                if (data) {
                    setWordDetails(data);
                } else {
                    setNotFound(true);
                }
            })
            .catch((err) => {
                console.error("Error fetching word details:", err);
                setNotFound(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [API_URL]);

    const handlePlayAudio = () => {
        const audioSrc = wordDetails?.phonetics?.[0]?.audio;
        if (audioSrc) {
            const audio = new Audio(audioSrc);
            audio.play();
        } else {
            console.error("Audio source is not available.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-2xl text-gray-500">
                Loading...
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="flex justify-center items-center min-h-screen text-2xl text-gray-500">
                Not Found
            </div>
        );
    }

    return (
        <div className="max-w-[1000px] mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
            <div
                className="flex flex-wrap justify-start gap-2 items-center border-b pb-6 mb-6 rounded-lg p-2"
                style={{ backgroundColor: "var(--main_color)" }}
            >
                <h1
                    className="text-4xl font-semibold m-0 flex gap-2 items-center"
                    style={{ color: "var(--text_color)" }}
                >
                    {wordDetails.word}
                    <p className="text-xl m-0" style={{ color: "var(--text_color)" }}>
                        {wordDetails.phonetics?.[0]?.text || "N/A"}
                    </p>
                </h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handlePlayAudio}
                        className="hover:text-gray-300 transition"
                        aria-label="Play pronunciation"
                        style={{ color: "var(--text_color)" }}
                    >
                        {wordDetails.phonetics[0]?.audio ? (
                            <HiSpeakerWave size={24} />
                        ) : (
                            <HiSpeakerXMark size={24} />
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Meaning Block 1 */}
                <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
                    <h3
                        className="text-2xl font-semibold mb-3 rounded-lg bg- p-2 -m-2"
                        style={{
                            backgroundColor: "var(--main_color)",
                            color: "var(--text_color)",
                        }}
                    >
                        Meaning
                    </h3>
                    <p className="italic font-semibold text-xl underline mb-3">
                        {wordDetails.meanings?.[0]?.partOfSpeech || "N/A"}
                    </p>
                    <div className="space-y-3 border-b">
                        {wordDetails.meanings?.[0]?.definitions?.length
                            ? wordDetails.meanings[0].definitions.map((definition, index) => (
                                <p key={index} className="text-gray-700 leading-relaxed pl-4">
                                    {definition.definition || "N/A"}
                                </p>
                            ))
                            : "N/A"}
                    </div>
                </div>

                {/* Additional Blocks */}
                {/* Add the second meaning block or any other content here */}
            </div>
        </div>
    );
};

WordsDetail.propTypes = {
    dictionary_url: PropTypes.string.isRequired,
};

export default WordsDetail;
