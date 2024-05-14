import React from "react";
import { MdDelete } from "react-icons/md";

const SelectedImages = ({
  selectedImages,
  onImageClick,
  onImageDeselect,
  editor,
}) => {
  return (
    <div className={`flex ${editor ? "flex-col" : "flex-row"}`}>
      {selectedImages.map((image, index) => (
        <div
          key={index}
          className="selected-image-container flex justify-center items-center flex-col"
        >
          <img
            src={URL.createObjectURL(image)}
            alt={`${image.name}`}
            onClick={() => onImageClick(index)}
            className="small-image"
          />
          {!editor ? (
            <span
              onClick={() => onImageDeselect(index)}
              className="deselect-button cursor-pointer"
            >
              <MdDelete color="red" />
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default SelectedImages;
