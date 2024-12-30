import axios from "axios";
import React, { useEffect } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import PropTypes from "prop-types"
import "../../main.css"

const WordsDetail = ({ dictionary_url }) => {
    const { id } = useParams();
    const [wordDetails, setWordDetails] = React.useState(null);

    const API_URL = `${dictionary_url}/${id}`;

    useEffect(() => {
        axios
            .get(API_URL)
            .then((res) => {
                setWordDetails(res.data[0]);
            })
            .catch((err) => console.error("Error fetching word details:", err));
    }, [API_URL]);

    console.log("Api", API_URL)
    const handlePlayAudio = () => {
        const audioSrc = wordDetails?.phonetics?.[0]?.audio;
        if (audioSrc) {
            const audio = new Audio(audioSrc);
            audio.play();
        } else {
            console.error("Audio source is not available.");
        }
    };

    return (
        <>
            {/* <Link to={"/"} className="absolute lg:left-[19.8rem] lg:top-[6.5rem] top-[6.1rem] left-[0.1rem] md:top-[6.9rem] md:left-[0.5rem] bg-white rounded-full " >
                <TbArrowBackUp className="text-4xl text-gray-950 hover:bg-black hover:text-white hover:rounded-lg" />
            </Link> */}
            {wordDetails ? (
                <div className="max-w-[1000px] mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
                    <div className="flex flex-wrap justify-start gap-2 items-center border-b pb-6 mb-6 rounded-lg p-2" style={{
                        backgroundColor: "var(--main_color)"
                    }}>
                        <h1 className="text-4xl font-semibold m-0 flex gap-2 items-center" style={{
                            color: "var(--text_color)"
                        }}>
                            {wordDetails.word}
                            <p className="text-xl m-0" style={{
                                color: "var(--text_color)"
                            }}>{wordDetails.phonetics?.[0]?.text || "N/A"}</p>
                        </h1>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handlePlayAudio}
                                className="hover:text-gray-300 transition"
                                aria-label="Play pronunciation"
                                style={{
                                    color: "var(--text_color)"
                                }}>
                                {wordDetails.phonetics[0]?.audio ? (
                                    <HiSpeakerWave size={24} />
                                ) : (
                                    <HiSpeakerXMark size={24} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Meaning Block 1 */}
                        <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
                            <h3 className="text-2xl font-semibold mb-3 rounded-lg bg- p-2 -m-2" style={{
                                backgroundColor: "var(--main_color)",
                                color: "var(--text_color)"
                            }} >Meaning</h3>
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
                            <div className="mt-4 border-b">
                                <p className="font-semibold">Synonyms:</p>
                                <p className="pl-4">{wordDetails.meanings?.[0]?.synonyms?.join(", ") || "N/A"}</p>
                            </div>
                            <div className="mt-4 border-b">
                                <p className="font-semibold">Antonyms:</p>
                                <p className="pl-4">{wordDetails.meanings?.[0]?.antonyms?.join(", ") || "N/A"}</p>
                            </div>
                            <div className="mt-4 border-b">
                                <p className="font-semibold">Example:</p>
                                <ul>
                                    {wordDetails.meanings?.[0]?.definitions?.map((definition, index) => (
                                        <li key={index} className="ml-8 text-gray-600 pl-4">
                                            {definition.example}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Meaning Block 2 */}
                        <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
                            <h3 className="text-2xl font-semibold mb-3 rounded-lg p-2 -m-2" style={{
                                backgroundColor: "var(--main_color)",
                                color: "var(--text_color)"
                            }}>Meaning</h3>
                            <p className="italic font-semibold text-xl underline mb-3">
                                {wordDetails.meanings?.[1]?.partOfSpeech || "N/A"}
                            </p>
                            <div className="space-y-3 border-b">
                                {wordDetails.meanings?.[1]?.definitions?.length
                                    ? wordDetails.meanings[1].definitions.map((definition, index) => (
                                        <p key={index} className="text-gray-700 leading-relaxed pl-4">
                                            {definition.definition || "N/A"}
                                        </p>
                                    ))
                                    : "N/A"}
                            </div>
                            <div className="mt-4 border-b">
                                <p className="font-semibold">Synonyms:</p>
                                <p className="pl-4">{wordDetails.meanings?.[1]?.synonyms?.join(", ") || "N/A"}</p>
                            </div>
                            <div className="mt-4 border-b">
                                <p className="font-semibold">Antonyms:</p>
                                <p className="pl-4">{wordDetails.meanings?.[1]?.antonyms?.join(", ") || "N/A"}</p>
                            </div>
                            <div className="mt-4 border-b">
                                <p className="font-semibold">Example:</p>
                                <ul>
                                    {wordDetails.meanings?.[1]?.definitions?.map((definition, index) => (
                                        <li key={index} className="ml-8 text-gray-600 pl-4">
                                            {definition.example}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* License Information */}
                    <div className="mt-6 border-t pt-4">
                        <span className="flex gap-2">

                            <p className="font-semibold">License:</p>
                            <Link
                                to={wordDetails.phonetics?.[0]?.license?.url || "#"}
                                target="_blank"
                                className="text-blue-500 hover:text-blue-700 transition"
                            >
                                {wordDetails.phonetics?.[0]?.license?.name || "N/A"}
                            </Link>
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-screen text-2xl text-gray-500">Loading...</div>
            )}
        </>
    );
};

WordsDetail.propTypes = {
    dictionary_url: PropTypes.string.isRequired,
};



export default WordsDetail;
