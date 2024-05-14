import React, { useRef, useState, useEffect } from "react";
import ImageDropzone from "./ImageDropzone";
import SelectedImages from "./SelectedImages";
import ImageEditor from "./ImageEditor";
import { base_url } from "../../services/api";

const ImageContainer = ({ setPhotos, photos }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageSelect = (images) => {
    setSelectedImages(images);
  };

  const urlToFile = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const filename = url.split("/").pop();
    console.log(filename)
    return new File([blob], filename, { type: blob.type });
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
  };
  
  const onImageDeselect = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  useEffect(() => {
    if (typeof setPhotos === "function") {
      setPhotos(selectedImages);
    }
  }, [selectedImages, setPhotos]);

  useEffect(() => {
    if (photos) {
      const images = photos.map((img) => {
        const url = `${base_url}/uploads/${img}`;
        return urlToFile(url);
      });
      Promise.all(images).then((files) => {
        setSelectedImages(files);
      });
    }
  }, []);

  return (
    <>
      <div className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80 px-3">
        Photos
      </div>

      <div className="px-3">
        <ImageDropzone
          onImageSelect={handleImageSelect}
          images={selectedImages}
        />

        <SelectedImages
          selectedImages={selectedImages}
          onImageClick={handleImageClick}
          onImageDeselect={(index) => onImageDeselect(index)}
        />

        {selectedImageIndex !== null && (
          <ImageEditor
            selectedImage={selectedImages[selectedImageIndex]}
            onClose={closeImageViewer}
            allImages={selectedImages}
            selectedImageIndex={selectedImageIndex}
            setSelectedImage={setSelectedImages}
            handleImageClick={(index) => handleImageClick(index)}
          />
        )}
      </div>
    </>
  );
};

export default ImageContainer;
