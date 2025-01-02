import React from 'react'
import './ImagePreview.css'
import deleteIcon from '../../../../images/trash3.svg'
const ImagePreview = ({state,dispatch}) => {

  const handlePreviewDelete=(index)=>{
      return dispatch({type:'REMOVE_IMAGE',payload:index})
  }
  const getImagePreviewURL=(previewImage)=>{
    if(typeof previewImage==='string')
      return previewImage
    return URL.createObjectURL(previewImage)
  }

  return (
    <section id='image-preview'>
    {
      state.images.map((previewImage,index)=>{
        return <div className='image-preview-box ' key={index}>
          <button className="delete-preview-button" onClick={()=>handlePreviewDelete(index)}><img src={deleteIcon} alt="delete" /></button>
          <img src={getImagePreviewURL(previewImage)} alt="Preview not available" />
        </div>
      })
    }
    </section>
  )
}

export default ImagePreview
