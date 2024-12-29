import React, { useEffect, useReducer } from "react";
import "./Suggestions.css";
import User from "../../../../components/user/User";
import {
  initialSuggestionsState,
  suggestionsReducer,
} from "../../../../reducers/SuggestionsReducer";
import { getSuggestedUser } from "../../../../services/UserService";
import { useUser } from "../../../../hooks/useUser";

import { toast } from "react-toastify";

const SuggestionsLoadig = () => {
  return <div id="suggestions-loading" className="skeleton"></div>;
};

const Suggestions = () => {
  const [state, dispatch] = useReducer(
    suggestionsReducer,
    initialSuggestionsState
  );
  const { user } = useUser();
  const { loading, suggestedUsers } = state;
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const suggestedUsers = await getSuggestedUser(user);
        dispatch({ type: "SET_SUGGESTED_USERS", payload: suggestedUsers });
      } catch (error) {
        toast.error("Unable to load suggestions");
      } finally {
        dispatch({ type: "STOP_LOADING" });
      }
    };
    fetchSuggestedUsers();
  }, []);

  const getUnfollowedUser = () => {
    return suggestedUsers.filter(
      (suggestedUser) => !user.following.includes(suggestedUser)
    );
  };
  return (
    <div id="suggestions">
      {loading ? (
        <SuggestionsLoadig />
      ) : (
        <>
          <header id="user-suggestion">
            <h4>Suggested for you</h4>
          </header>

          <>
            {getUnfollowedUser().map((user) => {
              return <User key={user.userId} user={user} />;
            })}
          </>
        </>
      )}
    </div>
  );
};

export default Suggestions;
