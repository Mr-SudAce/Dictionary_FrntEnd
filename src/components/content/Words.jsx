import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Words = ({dictionary_url}) => {
    const [input, setInput] = useState("");
    const [words, setWords] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    // reset the word if input is empty
    useEffect(() => {
        if (input.trim() === '') {
            setWords([]);
            return;
        }


        const fetchWords = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = `${dictionary_url}${input}`;
                const response = await axios.get(url);
                const fetchWords = response.data.map(letter => letter.word) || [];
                setWords(fetchWords);
            } catch (error) {
                console.error("Error fetching words:", error);
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchWords();
    }, [dictionary_url, input]);

    // Filter words based on input
    const filteredWords = words.filter((word) =>
        word.toLowerCase().startsWith(input.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>
            <h2>Word Filter</h2>
            <input
                type="text"
                placeholder="Type a letter or word..."
                value={input}
                onChange={(e) => setInput(e.target.value)} // Update input on change
                style={{ padding: "10px", fontSize: "16px", marginBottom: "10px" }}
            />

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">Error: {error.message}</p>}

            <ul>
                {filteredWords.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </ul>
        </div>
    );
};

Words.propTypes = {
    dictionary_url: PropTypes.string.isRequired,
};

export default Words;


