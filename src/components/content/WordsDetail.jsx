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
        if (data) setWordDetails(data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [API_URL]);

  const handlePlayAudio = () => {
    const audioSrc = wordDetails?.phonetics?.find(p => p.audio)?.audio;
    if (audioSrc) new Audio(audioSrc).play();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl text-[var(--secondary_text)]">
        Loading...
      </div>
    );

  if (notFound)
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl text-red-500">
        Word Not Found
      </div>
    );

  return (
    <div className="max-w-[1000px] mx-auto p-6 bg-[var(--card_bg)] rounded-xl shadow-md min-h-[69vh]">
      {/* Header */}
      <div
        className="flex flex-wrap justify-between items-center gap-4 mb-6 p-4 rounded-lg"
        style={{ backgroundColor: "var(--main_bg)", border: `1px solid var(--border_color)` }}
      >
        <div>
          <h1 className="text-4xl font-bold text-[var(--text_color)] flex flex-wrap gap-2 items-center">
            {wordDetails.word}
            <span className="text-xl" style={{ color: "var(--main_color)" }}>
              {wordDetails.phonetics?.[0]?.text || "N/A"}
            </span>
          </h1>
        </div>
        <button
          onClick={handlePlayAudio}
          className="text-[var(--text_color)] hover:text-gray-300 transition"
          aria-label="Play pronunciation"
        >
          {wordDetails.phonetics?.some(p => p.audio) ? (
            <HiSpeakerWave size={24} />
          ) : (
            <HiSpeakerXMark size={24} />
          )}
        </button>
      </div>

      {/* Meanings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wordDetails.meanings?.map((meaning, idx) => (
          <div
            key={idx}
            className="bg-[var(--main_bg)] p-4 rounded-md border border-[var(--border_color)]"
          >
            <h3
              className="text-2xl font-semibold mb-3 p-2 rounded"
              style={{ backgroundColor: "var(--main_bg)", border: `1px solid var(--border_color)`, color: "var(--text_color)" }}
            >
              {meaning.partOfSpeech || "Part of Speech"}
            </h3>
            {meaning.definitions?.map((def, i) => (
              <p key={i} className="text-[var(--text_color)] mb-2 pl-2">
                {def.definition || "N/A"}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

WordsDetail.propTypes = {
  dictionary_url: PropTypes.string.isRequired,
};

export default WordsDetail;