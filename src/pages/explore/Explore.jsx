import React, { useEffect, useState, useRef } from "react";
import "./Explore.css";
import PostsCard from "../../components/posts-card/PostsCard";
import { toast } from "react-toastify";
import { IoCloseCircle } from "react-icons/io5";
import Waiting from '../../components/waiting/Waiting';
import Spinner from '../../images/loading2.gif';
import { useUser } from '../../hooks/useUser';
import { usePosts } from "../../hooks/usePosts";
import { fetchExploringPosts } from "../../services/PostService";
import { fetchSearchedUsers } from "../../services/SearchService";
import UserInfo from "../../components/user-info/UserInfo";


const SmallDeviceSearchBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // tracks debounce period

  const searchRef = useRef(null);

  const generateNGrams = (text, n = 3) => {
    text = text.toLowerCase();
    const result = [];
    for (let i = 0; i <= text.length - n; i++) {
      result.push(text.substring(i, i + n));
    }
    return result;
  };

  useEffect(() => {
    if (!searchInput.trim() || searchInput.trim().length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true); // start debounce

    const debounceTimeout = setTimeout(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const query = searchInput.toLowerCase().trim();
          const queryNGrams = generateNGrams(query);

          const results = await fetchSearchedUsers({ nGrams: queryNGrams });
          setSearchResults(Array.isArray(results) ? results : []);
        } catch (error) {
          setSearchResults([]);
        } finally {
          setLoading(false);
          setIsSearching(false); // search finished
        }
      };

      fetchUsers();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchInput]);

  const clearInput = () => {
    setSearchInput("");
    setSearchResults([]);
  };

  const showNoResults =
    !loading && !isSearching && searchInput.trim().length >= 3 && searchResults.length === 0;

  return (
    <>
      <div id="small-device-search-box" ref={searchRef}>
        <section id="search-input">
          <input
            type="text"
            placeholder="Type at least 3 characters to search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setShowSearchResults(true)}
          />
          <button
            id="clear-search-input"
            className="all-centered"
            onClick={clearInput}
          >
            {loading ? <img src={Spinner} alt="loading" /> : <IoCloseCircle />}
          </button>
        </section>
        {showSearchResults && (
          <button
            id="cancel-search"
            onClick={() => setShowSearchResults(false)}
          >
            Cancel
          </button>
        )}
      </div>

      {showSearchResults && (
        <SmallDeviceSearchResults
          searchResults={searchResults}
          loading={loading}
          isSearching={isSearching}
          searchInput={searchInput}
        />
      )}
    </>
  );
};

const SmallDeviceSearchResults = ({ searchResults, loading, isSearching, searchInput }) => {
  const showNoResults =
    !loading && !isSearching && searchInput.trim().length >= 3 && searchResults.length === 0;

  return (
    <div id="small-device-search-results">
      {searchResults.map(result => (
        <UserInfo key={result.userId} userId={result.userId} userData={result} />
      ))}
      {showNoResults && <div className="no-results">No result found</div>}
    </div>
  );
};


const Explore = () => {
  const { user } = useUser();
  const { posts, loading, addPosts, startLoadingPosts, stopLoadingPosts } = usePosts();

  const getExploringPosts = async () => {
    try {
      startLoadingPosts();
      const exploringPosts = await fetchExploringPosts([user.userId, ...user.following]);
      addPosts(exploringPosts);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      stopLoadingPosts();
    }
  };

  const finalPosts = () =>
    posts.filter(post => !user.following.includes(post.user) && post.user !== user.userId);

  useEffect(() => {
    getExploringPosts();
  }, []);

  return (
    <div id="explore-page" className="app-pages">
      {loading ? (
        <Waiting />
      ) : (
        <>
          <SmallDeviceSearchBox />
          <div id="posts-wrapper">
            {finalPosts().map((post) => (
              <PostsCard key={post.postId} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Explore;
