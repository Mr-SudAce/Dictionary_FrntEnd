import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/word/detail/${query}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                className="focus:outline-none w-full h-[50px] px-2 text-lg"
                    type="text"
                    placeholder="Search for a word..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        padding: '8px',
                        marginBottom: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        width: '100%',
                        backgroundColor: "var(--main_bg)",
                    }}
                />
                <button type="submit" style={{ display: 'none' }}>Search</button>
            </form>
        </div>
    );
}

export default Search;
