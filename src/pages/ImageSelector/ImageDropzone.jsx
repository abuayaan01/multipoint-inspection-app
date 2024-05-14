import React, { useEffect, useState } from "react";
import Compressor from "compressorjs";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

const ImageDropzone = ({ onImageSelect, images }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const onDrop = async (acceptedFiles) => {
    // if (selectedImages.length + acceptedFiles.length > 5) {
    //   Swal.fire({
    //     icon: "error",
    //     toast: true,
    //     text: "Please select less than 5 images!",
    //     timer: 2000,
    //     showConfirmButton: false,
    //     position: "top-right",
    //   });
    //   return;
    // }
    const imgArr = await compressImages(acceptedFiles);
    const updatedImages = [...selectedImages, ...imgArr];
    setSelectedImages(updatedImages);
    onImageSelect(updatedImages);
  };

  useEffect(() => {
    setSelectedImages(images);
  }, [images]);

  const compressImages = async (imageArray) => {
    let compressedImagesArray = [];

    for (const photo of imageArray) {
      await compressImage(photo, compressedImagesArray);
    }

    return compressedImagesArray;
  };

  const compressImage = (photo, compressedImagesArray) => {
    return new Promise((resolve, reject) => {
      new Compressor(photo, {
        quality: 0.3,
        success(result) {
          const compressedFile = new File([result], photo.name, {
            type: "image/jpeg",
          });
          compressedImagesArray.push(compressedFile);
          resolve();
        },
        error(err) {
          console.error(err.message);
          reject(err);
        },
      });
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // maxFiles: 5,
    accept: { "image/jpeg": [], "image/png": [], "image/jpg": [] },
  });

  return (
    <div className="">
      <div
        {...getRootProps()}
        className="dropzone rounded-xl bg-slate-100 cursor-pointer"
      >
        <input {...getInputProps()} className="" />
        <p className="text-slate-400 ">
          Drag 'n' drop some files here, or click to select files
        </p>
        {/* <em>(5 files are the maximum number of files you can drop here)</em> */}
      </div>
    </div>
  );
};

export default ImageDropzone;
