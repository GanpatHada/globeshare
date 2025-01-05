import React, { useEffect, useState } from "react";
import "./Suggestions.css";
import {
  fetchSuggestedUser,
  followUser,
} from "../../../../services/UserService";
import { useUser } from "../../../../hooks/useUser";
import { toast } from "react-toastify";
import UserInfo from "../../../../components/user-info/UserInfo";

const SuggestionsLoadig = () => {
  return <div id="suggestions-loading" className="skeleton"></div>;
};

const SuggestedUser = ({ suggestedUser }) => {
  const {
    user: { userId },followUserOnClient
  } = useUser();
  const [loading, setLoading] = useState(false);
  const handleFollowUser = async (userId, user) => {
    try {
      setLoading(true);
      await followUser(userId, user);
      toast.success("Started following");
      followUserOnClient(suggestedUser)

    } catch (error) {
      toast.error("unable to follow at the moment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <UserInfo userId={suggestedUser} />
      <button onClick={() => handleFollowUser(userId, suggestedUser)}>
        {loading ? "Following ..." : "Follow"}
      </button>
    </div>
  );
};

const Suggestions = () => {
  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    const getSuggestedUsers = async () => {
      try {
        const suggestedUsers = await fetchSuggestedUser(user);
        setSuggestedUsers(suggestedUsers);
      } catch (error) {
        toast.error("Unable to load suggestions");
      } finally {
        setLoading(false);
      }
    };
    getSuggestedUsers();
  }, []);

  const filterSuggestedUsers=()=>suggestedUsers.filter(sUser=>!user.following.includes(sUser));

  return (
    <div id="suggestions">
      {loading ? (
        <SuggestionsLoadig />
      ) : (
        <>
          <header id="user-suggestion">
            <h4>Suggested for you</h4>
          </header>
          <section id="suggested-users">
            {filterSuggestedUsers().map((user) => {
              return (
                <SuggestedUser key={user} suggestedUser={user} />
              );
            })}
          </section>
        </>
      )}
    </div>
  );
};

export default Suggestions;
