import './ImagePreview.css'
import deleteIcon from '../../../../images/trash3.svg'

const ImagePreview = ({ state, dispatch }) => {
  const handlePreviewDelete = (index) => {
    dispatch({ type: 'REMOVE_IMAGE', payload: index })
  }

  const getImagePreviewURL = (previewImage) => {
    if (typeof previewImage === 'string') return previewImage
    return URL.createObjectURL(previewImage)
  }
  const previewBoxes = Array.from({ length: 3 }, (_, i) => state.images[i] || null)

  return (
    <section id="image-preview">
      {previewBoxes.map((previewImage, index) => (
        <div
          key={index}
          className={`image-preview-box ${!previewImage ? 'empty-preview-box' : ''}`}
        >
          {previewImage && (
            <>
              <button
                className="delete-preview-button"
                onClick={() => handlePreviewDelete(index)}
              >
                <img src={deleteIcon} alt="delete" />
              </button>
              <img src={getImagePreviewURL(previewImage)} alt="Preview not available" />
            </>
          )}
        </div>
      ))}
    </section>
  )
}

export default ImagePreview
