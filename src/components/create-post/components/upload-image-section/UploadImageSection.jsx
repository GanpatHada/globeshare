import React, { useRef } from "react";
import "./UploadImageSection.css";
import uploadImg from '../../../../images/upload.svg'
import add_photo from "../../../../images/add_photo.svg";

const UploadImageSection = ({ images, setImages }) => {
  const fileRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImages([...images, file]);
    fileRef.current.value = "";
  };

  const handleUploadWithUrl = () => {
    let url = prompt("Please enter the url");
    console.log(typeof(url))
    if (url != null) {
      setImages([...images,url])
    }
  };

  return (
    <section id="upload-image" className="all-centered" htmlFor="photo-upload">
      <span>
        <img src={add_photo} alt="" />
      </span>
      <label
        htmlFor="photo-upload"
        style={{ display: images.length <= 4 ? "flex" : "none" }}
        className="all-centered"
      >
        <img src={uploadImg}  alt="" />upload {images.length === 0 ? "image" : "more images"}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          id="photo-upload"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </label>
      {images.length<=4&&<button
        id="enter-url-btn"
        className="secondary-btn"
        onClick={handleUploadWithUrl}
      >
        <strong>Enter URL</strong>
      </button>}
    </section>
  );
};

export default UploadImageSection;
