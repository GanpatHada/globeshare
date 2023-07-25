import React, { useState } from 'react'
import './PreviewImageSection.css'


import CrossButton from "../../../../components/cross-button/CrossButton";
const PreviewImageSection = ({images,setImages}) => {
  const deletePreview = (index) => {
        setImages(images.filter((e, i) => i !== index));
  };
  return (
    <div>
        {images.length > 0 && (
        <section id="preview-section">
          {images.map((image, index) => {

            let previmage=image;
            if(typeof(previmage)!=='string')
                previmage=URL.createObjectURL(image);
            return (
              <div className="each-preview" key={index}>
                <span 
                  className="prev-cross-btn all-centered"
                  onClick={() => deletePreview(index)}
                >
                <CrossButton />
                </span>
                <img src={previmage} alt={`Preview ${index}`} />
              </div>
            );
          })}
        </section>
      )}
    </div>
  )
}

export default PreviewImageSection