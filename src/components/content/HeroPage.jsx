import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import foto from "../../assets/book1.png";
import Features from "./Features.jsx";
import WordOfTheDay from "./WordOfTheDay.jsx";
import PropTypes from 'prop-types';


const HeroPage = ({ base_url }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async (searchTerm) => {
            if (!searchTerm.trim()) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        // Only fetch results if query is not empty
        if (query.trim()) {
            fetchResults(query);
        } else {
            setResults([]); // Reset results if query is empty
        }
    }, [query]);


    return (
        <>
            <div
                className="relative lg:h-[45.8rem] md:h-[26rem] h-[25rem] shadow"
                style={{
                    backgroundImage: `url(${foto})`,
                    backgroundSize: "cover",
                    backgroundColor: "var(--main_color)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
                    <div className="text-center w-full max-w-4xl px-4">
                        <h1
                            className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4"
                            style={{
                                textShadow: "2px 2px 5px var(--hover_color)",
                                color: "var(--text_color)",
                            }}
                        >
                            Welcome to MeaningBy!
                        </h1>
                        <p
                            className="text-lg md:text-xl lg:text-xl font-semibold justify-center"
                            style={{
                                textShadow: "2px 2px 5px var(--hover_color)",
                                color: "var(--text_color)",
                            }}
                        >
                            Enhance your vocabulary.
                        </p>
                    </div>
                    <div className="relative w-full max-w-xl">
                        <span className="flex items-center">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type a word to search..."
                                className="focus:outline-none w-full h-[50px] px-2 text-lg"
                                style={{
                                    backgroundColor: "var(--main_bg)",
                                }}
                            />
                        </span>
                        {loading && (
                            <p
                                className="absolute px-2"
                                style={{ color: "var(--text_color)" }}
                            >
                                Loading...
                            </p>
                        )}
                        {!loading && results.length === 0 && query.trim() && (
                            <p
                                className="absolute px-2"
                                style={{ color: "var(--text_color)" }}
                            >
                                No results found.
                            </p>
                        )}
                        <ul className="absolute w-full rounded-md"
                            style={{
                                listStyleType: "none",
                                padding: "0",
                            }}
                        >
                            {results.map((result, index) => (
                                <Link
                                    key={index}
                                    to={`/word/detail/${result.word}`}
                                    className="text-decoration-none "
                                    style={{ color: "var(--main_color)", }}
                                >
                                    <li className="p-2 shadow-sm" style={{ backgroundColor: "var(--main_bg)", }}>
                                        <strong>{result.word}</strong>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <WordOfTheDay />
                <Features base_url={base_url} />
            </div>
        </>
    );
};

HeroPage.propTypes = {
    base_url: PropTypes.string.isRequired,
};
export default HeroPage;
