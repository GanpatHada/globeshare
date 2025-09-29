import "./ProfileHeader.css";
import { useNavigate } from "react-router-dom";
import profile from "../../../../images/profile.png";
import { FaLink } from "react-icons/fa6";
import { usePosts } from "../../../../hooks/usePosts";
import { logout } from "../../../../services/LoginService";
import { useUser } from "../../../../hooks/useUser";
import { useDialog } from "../../../../hooks/useDialog";
import { followUser, unfollowUser } from "../../../../services/UserService";
import { useState } from "react";
import { toast } from "react-toastify";
import loader from '../../../../images/loading2.gif'
const ProfileHeader = ({ userProfile }) => {
  const { posts } = usePosts();
  const { user} = useUser();
  const { openDialog } = useDialog();
  const {
      followUserOnClient,
      unFollowUserOnClient
    } = useUser();
  const navigate = useNavigate();
  const {
    userId,
    bio,
    profilePhoto,
    userName,
    fullName,
    followers,
    following,
    website,
  } = userProfile;
  const [loading, setLoading] = useState(false);
  const myPostsCount = () =>
    posts.filter((post) => post.user === userId).length;

  const showFollowing = () => openDialog(userId, "FOLLOWING");
  const showFollowers = () => openDialog(userId, "FOLLOWERS");

  const isFollowing = user.following.includes(userId);

  const toggleFollowingStatus = async () => {
    setLoading(true);
    try {
      if (isFollowing)
      {
        await unfollowUser(user.userId,userId);
        unFollowUserOnClient(userId)
      }
      else
      {
        await followUser(user.userId,userId);
        followUserOnClient(userId)
      }
    } catch (error) {
      toast.error("Unable to complete action");
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <header id="profile-header">
      <section className="profile-image-section">
        <div className="profile-image">
          <img src={profilePhoto ? profilePhoto.url : profile} alt="" />
        </div>
      </section>
      <section className="profile-bio-section">
        <div>
          <h3>{userName}</h3>
          {userId === user.userId ? (
            <>
              <button
                className="secondary-btn"
                onClick={() => navigate("/profile/edit")}
              >
                Edit Profile
              </button>
              <button className="secondary-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={toggleFollowingStatus}
              className={`${isFollowing ? "secondary-btn" : "primary-btn"}`}
            >{loading&&<div className="loading">
              <img src={loader} alt="" />
            </div>}
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        <div id="posts-info">
          <p>
            <strong>{myPostsCount()}</strong>Posts
          </p>
          <button disabled={followers.length === 0} onClick={showFollowers}>
            <strong>{followers.length}</strong>Followers
          </button>
          <button disabled={following.length === 0} onClick={showFollowing}>
            <strong>{following.length}</strong>Following
          </button>
        </div>
        <div id="profile-bio">
          <h4>{fullName}</h4>
          <p>{bio}</p>

          <p>
            {website && (
              <a
                href={website}
                title={website}
                rel="noreferrer"
                target="_blank"
              >
                <span>
                  <FaLink />
                </span>
                website
              </a>
            )}
          </p>
        </div>
      </section>
    </header>
  );
};

export default ProfileHeader;
