import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";



const SearchBarWithSuggestions = () => {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [error, setError] = useState(null);
    const searchRef = useRef(null);

    const dispatch = useDispatch();
    const store_data = useSelector((state) => state.Data);
    const[allItems,setallItems] = useState( store_data?.UserInfo?.services?.static_site || [  {
        id: 'v5rbshhcz3jugwesrc0d',
        website_name: 'ert',
        site_folder: '/uploads/user_2toHJt9mAE8DdKyaCIu8R91Fjv9/2tqzx',
        route: '/wlartno9hq',
        URL: 'http://localhost:88/wlartno9hq',
        Date: '21/4/2025'
      },
      {
        id: 'shgo1g2kfnp05or65imi',
        website_name: 'fghy7',
        site_folder: '/uploads/user_2toHJt9mAE8DdKyaCIu8R91Fjv9/n1vku',
        route: '/9jzd3ruevv',
        URL: 'http://localhost:88/9jzd3ruevv',
        Date: '21/4/2025'
      }])
  

    useEffect(() => {
        console.log("detected the site in searchbar-> :", store_data?.UserInfo?.services?.static_site);
        setallItems(store_data?.UserInfo?.services?.static_site);
    }, [store_data?.UserInfo?.services?.static_site])


    // Filter suggestions based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSuggestions([]);
            return;
        }

        const filtered = allItems?.filter(item =>
            item.website_name?.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];
        setSuggestions(filtered);
        setActiveSuggestion(-1);
        setShowSuggestions(true);
    }, [searchQuery]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.website_name);
        setShowSuggestions(false);
        // You can add additional logic here like navigation or search execution
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestion(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestion(prev => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter' && activeSuggestion >= 0) {
            e.preventDefault();
            handleSuggestionClick(suggestions[activeSuggestion]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Handle search submission
        console.log('Search submitted:', searchQuery);
        setShowSuggestions(false);
    };

    return (
        <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search..."
                        className="w-full p-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`px-4 py-2 cursor-pointer bg-slate-800  ${index === activeSuggestion ? 'bg-slate-800' : ''
                                }`}
                        >
                            {suggestion.website_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBarWithSuggestions;