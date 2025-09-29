import React, { useEffect, useState } from "react";
import "./UserListDialog.css";
import { useDialog } from "../../hooks/useDialog";
import { getPostDetails } from "../../services/PostService";
import { fetchCurrentUserDetails } from "../../services/UserService";
import { toast } from "react-toastify";
import CrossButton from "../cross-button/CrossButton";
import UserInfo from "../user-info/UserInfo";
import { useUser } from "../../hooks/useUser";
import { FollowButton, FollowingButton, RemoveButton } from "../buttons/Buttons";

const renderActionButton = (friend, user, dialogContentId, dialogContentType) => {
  if(friend===user.userId)
     return;  

  if (dialogContentType === "FOLLOWERS" && dialogContentId === user.userId) {
    return <>{!user.following.includes(friend) && <FollowButton targetUser={friend} />}<RemoveButton targetUser={friend}/></>;
  }

  return user.following.includes(friend) ? <FollowingButton targetUser={friend} /> : <FollowButton targetUser={friend} />;
};

const UserListDialog = () => {
  const { closeDialog, dialogContentId, dialogContentType } = useDialog();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const getUsersList = async () => {
    try {
      setLoading(true);
      let usersList = [];

      if (dialogContentType === "LIKES") {
        const list = await getPostDetails(dialogContentId);
        usersList = list.likes;
      } else {
        const list = await fetchCurrentUserDetails(dialogContentId);
        usersList = list[dialogContentType.toLowerCase()];
      }

      setUsers(usersList);
    } catch (error) {
      toast.error("unable to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersList();
  }, [dialogContentId, dialogContentType,user]);

  return (
    <div>
      <header className="dialog-header">
        <h1>
          {dialogContentType.charAt(0).concat(dialogContentType.slice(1).toLowerCase())}
        </h1>
        <CrossButton closeModal={closeDialog} />
      </header>
      {/* <div className="search-box">
          <input type="search" placeholder="Search" />
      </div> */}
      <main className="dialog-content">
        {users.map((friend) => (
          <div key={friend}>
            <UserInfo userId={friend} closeOnClickUser={closeDialog} />
            <div className="buttons">
                {renderActionButton(friend, user, dialogContentId, dialogContentType)}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default UserListDialog;
