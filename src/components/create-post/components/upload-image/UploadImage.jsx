import { useRef, useState } from "react";
import "./UploadImage.css";
import { IoIosImages } from "react-icons/io";

const UploadImage = ({ state, dispatch }) => {
  const fileRef = useRef(null);
  const { images } = state;
  const [isDragging, setIsDragging] = useState(false);

  const MAX_IMAGES = 3;

  const handleSelectedImages = () => {
    if (images.length >= MAX_IMAGES) {
      alert("You can upload a maximum of 3 images.");
      return;
    }

    const file = fileRef.current.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select only image files (JPG, PNG, etc).");
      return;
    }

    dispatch({ type: "SET_IMAGES", payload: file });
  };

  const handleDragOver = (e) => {
    if (images.length >= MAX_IMAGES) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (images.length >= MAX_IMAGES) {
      alert("You already uploaded 3 images.");
      return;
    }

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please drop only image files (JPG, PNG, etc).");
      return;
    }

    dispatch({ type: "SET_IMAGES", payload: file });
  };

  return (
    <section
      id="upload-image"
      className={`all-centered ${isDragging ? "drag-active" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div id="upload-image-content" className="all-centered">
        <span id="upload-image-placeholder">
          <IoIosImages />
        </span>

        {images.length < MAX_IMAGES ? (
          <>
            <label id="upload-from-device" htmlFor="upload-photo" className="primary-btn">
              Upload image from device
            </label>

            <div>
              <input
              type="file"
              accept="image/*"
              multiple={false}
              style={{ display: "none" }}
              id="upload-photo"
              onChange={handleSelectedImages}
              ref={fileRef}
            />
            <span>You can also <strong>drag & drop</strong> your image here.</span>
            </div>

            <p className="info">
              Please select only image files (JPG, PNG, etc) | &nbsp;
              <span>
              Maximum&nbsp;
              {MAX_IMAGES - images.length}
              {images.length > 0 && " more"} file{MAX_IMAGES-images.length>1&&'s'} can be selected.
            </span>
            </p>

           
          </>
        ) : (
          <p className="info">
            Maximum {MAX_IMAGES} images uploaded (limit reached)
          </p>
        )}
      </div>
    </section>
  );
};

export default UploadImage;
