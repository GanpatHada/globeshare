import "./ProfileNav.css";
import { NavLink, useParams } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";
import { MdOutlineGridOn } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";

const ProfileNav = () => {
  const { user } = useUser();
  const { userId: currentUser } = useParams();

  return (
    <nav id="profile-nav">
      <ul className="all-centered" id="profile-nav-container">
        <li>
          <NavLink title="Posts" to="" end>
            <MdOutlineGridOn />
          </NavLink>
        </li>
        {user && String(user.userId) === String(currentUser) && (
          <li>
            <NavLink title="Saved" to="bookmarks">
             <IoBookmarkOutline />
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default ProfileNav;
