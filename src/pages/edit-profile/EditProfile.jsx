import React, { useRef } from "react";
import "./EditProfile.css";
import CrossButton from "../../components/cross-button/CrossButton";
const EditProfile = () => {
  const bio = useRef(null);
  return (
    <div id="edit-profile" className="all-centered">
      <div id="edit-profile-box">
        <h2>Edit Profile</h2>
        <div>
          <label htmlFor="profile-image" id="profile-image"><img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="" /></label>
          <button id="profile-image-btn">change profile photo</button>
        </div>
        <div>
          <label htmlFor="name">
            <strong>Name</strong>
          </label>
          <div>
             <input id="name" type="text" />
             <span>Name that to be displayed accross the globeshare enter the first name followed by space and then last name</span>
          </div>
          
        </div>
        <div>
          <label htmlFor="website">
            <strong>Website</strong>
          </label>
          <div>

          <input type="text" id="website" />
          <span>Enter the url of you personal website portfolio or any pages that you want to showcase</span>
          </div>
        </div>
        <div>
          <label htmlFor="bio">
            <strong>Bio</strong>
          </label>
          <div>
            <textarea
              id="bio"
              ref={bio}
              onChange={() =>
                (bio.current.style.height = bio.current.scrollHeight + "px")
              }
              style={{ minHeight: "80px" }}
            ></textarea>
          <span id="bio-counter">word counter</span>
          <span>Enter the bio about your interests and profession the bio should not be more than 150 words</span>
          </div>
        </div>
        <button className="profile-btns" id="upload-btn">Update</button>
        <button className="profile-btns" id="can-btn">Cancel</button>
      </div>
    </div>
  );
};

export default EditProfile;
