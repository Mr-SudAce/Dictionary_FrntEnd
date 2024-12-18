import { useState } from "react";
import { FaSearch } from "react-icons/fa";


const users = [
    { firstName: "John", id: 1 },
    { firstName: "Emily", id: 2 },
    { firstName: "Michael", id: 3 },
    { firstName: "Sarah", id: 4 },
    { firstName: "David", id: 5 },
    { firstName: "Jessica", id: 6 },
    { firstName: "Daniel", id: 7 },
    { firstName: "Olivia", id: 8 },
    { firstName: "Matthew", id: 9 },
    { firstName: "Sophia", id: 10 }
]

const Search = () => {
    const [searchItem, setSearchItem] = useState("");
    const [filterUser] = useState(users);

    // Handle input change
    const handleInputItem = (e) => {
        setSearchItem(e.target.value);
    };

    // Filter the list based on search input
    const filteredResults = filterUser.filter(user =>
        user.firstName.toLowerCase().includes(searchItem.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-cols justify-end py-4 w-full">
                <input
                    type="text"
                    value={searchItem}
                    onChange={handleInputItem}
                    className="w-full lg:w-1/2 md:w-full sm:w-1 p-3 border outline-none rounded-md mx-1"
                    placeholder="Search Here . . . ."
                />
                <div className="absolute top-0 left-0 right-0">

                    {/* Show filtered results */}
                    {searchItem && (
                        <ul className="mt-2 max-h-48 overflow-auto border border-gray-300 rounded-md">
                            {filteredResults.length > 0 ? (
                                filteredResults.map(user => (
                                    <li key={user.id} className="p-2 hover:bg-gray-200 cursor-pointer">
                                        {user.firstName}
                                    </li>
                                ))
                            ) : (
                                <li className="p-2 text-gray-500">No results found</li>
                            )}
                        </ul>
                    )}
                </div>
                <button className="submit w-[4rem] border flex justify-center items-center bg-slate-400 rounded-md hover:text-red-500 text-gray-100">
                    <FaSearch size={20} />
                </button>
                {/* Search Button */}


            </div>
        </>
    );
};

export default Search;
