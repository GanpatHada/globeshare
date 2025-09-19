import { useEffect, useRef, useState } from "react";
import "./SearchBox.css";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { useSearch } from "../../hooks/useSearch";
import UserInfo from "../user-info/UserInfo";
import { fetchSearchedUsers } from "../../services/SearchService";
import loadingImage from '../../images/loading2.gif';

const SearchBox = ({ searchBox, closeSearchBox }) => {
  const {
    searchText,
    loading,
    setSearchText,
    startSearchLoading,
    stopSearchLoading,
    setSearchResults,
    searchResults,
  } = useSearch();

  const [isSearching, setIsSearching] = useState(false); // new state
  const searchRef = useRef(null);
  useClickOutsideHandler(searchRef, closeSearchBox);

  const generateNGrams = (text, n = 3) => {
    text = text.toLowerCase();
    const result = [];
    for (let i = 0; i <= text.length - n; i++) {
      result.push(text.substring(i, i + n));
    }
    return result;
  };

  useEffect(() => {
    if (!searchText.trim() || searchText.trim().length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true); // start debounce search

    const debounceTimeout = setTimeout(() => {
      const fetchUsers = async () => {
        try {
          startSearchLoading();
          const query = searchText.toLowerCase().trim();
          const queryNGrams = generateNGrams(query);
          const results = await fetchSearchedUsers({ nGrams: queryNGrams });
          setSearchResults(results);
        } catch (error) {
          
          setSearchResults([]);
        } finally {
          stopSearchLoading();
          setIsSearching(false); // search finished
        }
      };

      fetchUsers();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchText]);

  const showNoResults =
    !loading && !isSearching && searchText.trim().length >= 3 && searchResults.length === 0;

  return (
    <div
      id="search-box"
      ref={searchRef}
      style={{ transform: `translateX(${searchBox ? "70px" : "-400px"})` }}
    >
      <header>
        <h3>Search</h3>
        <div className="search-input-wrapper">
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Type at least 3 characters to search"
          />
          {(loading || isSearching) && (
            <div className="loading">
              <img src={loadingImage} alt="loading" />
            </div>
          )}
        </div>
      </header>
      <div id="search-content">
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div key={result.userId}>
              <UserInfo userId={result.userId} userData={result} />
            </div>
          ))
        ) : (
          showNoResults && <div className="no-results">No results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
