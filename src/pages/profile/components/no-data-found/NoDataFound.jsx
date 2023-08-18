import React, { useContext } from "react";
import emptyBox from "../../../../images/empty-box.png";
import { UserContext } from "../../../../contexts/UserContext";
import { ModalContext } from "../../../../contexts/ModalContext";
const NoDataFound = ({ mode, userId }) => {
  const { user } = useContext(UserContext);
  const { openCreatePostModal } = useContext(ModalContext);
  return (
    <div className="no-data-found">
      <img src={emptyBox} alt="" />
      <span>{`opps! No ${mode} yet`}</span>
      {user.uid === userId && mode==='posts' &&(
        <button onClick={openCreatePostModal} className="primary-btn">
          Create
        </button>
      )}
    </div>
  );
};

export default NoDataFound;
