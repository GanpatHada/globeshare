import React, { useEffect, useState } from "react";
import "./Suggestions.css";
import {
  fetchSuggestedUser,
  followUser,
} from "../../../../services/UserService";
import { useUser } from "../../../../hooks/useUser";
import { toast } from "react-toastify";
import UserInfo from "../../../../components/user-info/UserInfo";
import {useNotification} from '../../../../hooks/useNotification'
import { fetchUserPosts } from "../../../../services/PostService";
import {usePosts} from '../../../../hooks/usePosts'

const SuggestionsLoadig = () => {
  return <div id="suggestions-loading" className="skeleton"></div>;
};



const SuggestedUser = ({ suggestedUserData }) => {
  const {notify}=useNotification();
  const {addPosts}=usePosts();
  const {
    user: { userId },followUserOnClient
  } = useUser();
  const [loading, setLoading] = useState(false);
  const handleFollowUser = async () => {
    try {
      setLoading(true);
      await followUser(userId,suggestedUserData.id);
      const posts=await fetchUserPosts(suggestedUserData.id);
      if(posts.length>0)
         addPosts(posts)
      notify({heading:'Started following',info:`You started following ${suggestedUserData.userName}`},'success')
      followUserOnClient(suggestedUserData.id)

    } catch (error) {
      toast.error("unable to follow at the moment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <UserInfo userId={suggestedUserData.id} userData={suggestedUserData} />
      <button onClick={handleFollowUser}>
        {loading ? "Following ..." : "Follow"}
      </button>
    </div>
  );
};

const Suggestions = () => {
  const [loading, setLoading] = useState(true);
  const [suggestedUsersData, setSuggestedUsersData] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    const getSuggestedUsers = async () => {
      try {
        const suggestedUsers = await fetchSuggestedUser(user);
        setSuggestedUsersData(suggestedUsers);
      } catch (error) {
        toast.error("Unable to load suggestions");
      } finally {
        setLoading(false);
      }
    };
    getSuggestedUsers();
  }, []);

  const filterSuggestedUsers=()=>suggestedUsersData.filter(sUser=>!user.following.includes(sUser.id));
  return (
    <div id="suggestions">
      {loading ? (
        <SuggestionsLoadig />
      ) : (
        <>
          <header id="user-suggestion">
            <h1>Suggested for you</h1>
          </header>
          <section id="suggested-users">
            {filterSuggestedUsers().map((user) => {
              return (
                <SuggestedUser key={user.id} suggestedUserData={user} />
              );
            })}
          </section>
        </>
      )}
    </div>
  );
};

export default Suggestions;
