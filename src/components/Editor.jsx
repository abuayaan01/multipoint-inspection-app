import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BsClipboard2Plus } from "react-icons/bs";
import { LiaBroomSolid } from "react-icons/lia";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const Editor = ({ label, value, onChange, comment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openComment, setOpenComment] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [comments, setComments] = useState(comment);

  const [size, setSize] = React.useState("xl");

  const onOpenComment = () => setOpenComment(true);
  const onCloseComment = () => {
    setOpenComment(false);
    setCheckboxValues([]);
  };

  // const comments = [
  //   "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, accusamus!",
  //   "Lorem ipsum dolor sit amet.",
  //   "Aceat autem dolorem nesciunt nobis illum cum quod adipisci? Asperiores iure est ex.",
  // ];

  const addComments = () => {
    let combinedValue =  value == '<p><br></p>' ? '' : value;
    checkboxValues.map((data) => {
      combinedValue = combinedValue + " " + data;
    });
    onChange(combinedValue);
   
  };

  const clearEditor = () => {
    onChange('');
  };

  const handleCheckboxChange = (comment) => {
    setCheckboxValues((prevValues) => {
      if (prevValues.includes(comment)) {
        return prevValues.filter((value) => value !== comment);
      } else {
        return [...prevValues, comment];
      }
    });
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "color",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <>
      <div className="mx-3">
        <label
          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
          htmlFor={label}
        >
          {label}
        </label>
        <div className="flex justify-center items-center space-x-3">
          <div onClick={onOpen} className="flex-1">
            <ReactQuill
              className="bg-[white] my-2"
              theme="snow"
              value={value}
              //   onChange={onChange}
              toolbar={false}
              readOnly
              modules={{ toolbar: false }}
            />
          </div>
          <div
            className="p-3 rounded-lg border-[1px] border-gray-300"
            onClick={onOpenComment}
          >
            <BsClipboard2Plus color="#9a9a9a" size={23} />
          </div>
          <div
            className="p-3 rounded-lg border-[1px] border-gray-300"
            onClick={clearEditor}
          >
            <LiaBroomSolid  color="#9a9a9a" size={23} />
          </div>
        </div>
      </div>

      <Modal onClose={onClose} size={size} isOpen={isOpen} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReactQuill
              className="custom-editor bg-slate-100 my-2"
              placeholder="Write something..."
              theme="snow"
              value={value}
              onChange={onChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button textColor={"#fff"} bg={"green.300"} onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        onClose={onCloseComment}
        size={size}
        isOpen={openComment}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Comments</ModalHeader>
          <ModalCloseButton onClick={onCloseComment} />
          <ModalBody>
            <div>

              {comments?.map((comment2, idx) => (
                <div className="flex items-center my-5" key={idx}>
                  <input
                    className="appearance-none checkboxColor cursor-pointer transition-all duration-200 ease-in-out hover:scale-150 min-w-[14px] w-4 h-4 checked:border-0 checked:rounded-full  checked:bg-orange-400 border-slate-500 border-[2px]"
                    id={idx}
                    type="checkbox"
                    value={comment2}
                    onChange={() => handleCheckboxChange(comment2)}
                  />
                  <label
                    htmlFor={idx}
                    className="text-slate-600 px-3 text-sm cursor-pointer"
                  >
                    {comment2}
                  </label>
                </div>
              ))}

            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              textColor={"#fff"}
              bg={"green.300"}
              onClick={() => {
                addComments();
                onCloseComment();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Editor;
