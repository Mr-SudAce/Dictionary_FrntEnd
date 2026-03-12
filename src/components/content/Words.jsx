import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";

const Words = ({ dictionary_url }) => {
  const [input, setInput] = useState("");
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  useEffect(() => {
    if (input.trim() === "") {
      setWords([]);
      setError(null);
      return;
    }

    const fetchWords = async () => {
      setLoading(true);
      setError(null);

      if (cancelToken.current) {
        cancelToken.current.cancel("Cancelled due to new request");
      }
      cancelToken.current = axios.CancelToken.source();

      try {
        const response = await axios.get(`${dictionary_url}${input}`, {
          cancelToken: cancelToken.current.token,
        });

        // Ensure response is an array and map safely
        const fetchedWords =
          Array.isArray(response.data) && response.data.length
            ? response.data.map((item) => item.word).filter(Boolean)
            : [];

        setWords(fetchedWords);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching words:", err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    // Debounce for smooth typing experience
    const debounce = setTimeout(fetchWords, 300);
    return () => clearTimeout(debounce);
  }, [dictionary_url, input]);

  const filteredWords = words.filter((word) =>
    word.toLowerCase().startsWith(input.toLowerCase())
  );

  return (
    <div className="p-6 max-w-md mx-auto bg-[var(--card_bg)] rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[var(--text_color)]">Word Filter</h2>
      <input
        type="text"
        placeholder="Type a letter or word..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 mb-4 border border-[var(--border_color)] rounded text-[var(--text_color)] bg-[var(--main_bg)]"
      />

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <ul className="list-disc pl-5 text-[var(--secondary_text)]">
        {filteredWords.map((word, idx) => (
          <li key={idx} className="py-1">
            {word}
          </li>
        ))}
        {filteredWords.length === 0 && input && !loading && !error && (
          <li className="py-1 text-gray-400">No matching words found.</li>
        )}
      </ul>
    </div>
  );
};

Words.propTypes = {
  dictionary_url: PropTypes.string.isRequired,
};

export default Words;