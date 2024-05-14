import React, { useEffect, useState } from "react";
import DynamicFields from "./DynamicFields";
import { MdDelete } from "react-icons/md";
import {
  useDisclosure,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalContent,
  Select,
  useToast,
} from "@chakra-ui/react";
import { IoAddCircle } from "react-icons/io5";

function FormFieldsCreator({ setExtra, extra }) {
  const [label, setLabel] = useState();
  const [type, setType] = useState();
  const [options, setOptions] = useState([]);
  const [isOption, setIsOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [index, setIndex] = useState(-1);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const Toast = useToast();

  const pushField = () => {
    if (!label || !type) {
      Toast({
        title: `Please enter the ${label ? "type" : "label"}`,
        status: "error",
        isClosable: true,
      });
      return;
    }

    if ((type == ("checkbox") || type == ("select")) && options.length == 0) {
      Toast({
        title: `Please add options`,
        status: "error",
        isClosable: true,
      });
      return;
    }

    const newExtra = [...extra];

    if (index >= 0) {
      newExtra[index] = {
        label: label,
        name: label,
        type: type,
        options: options,
        value: type == "checkbox" ? [] : '',
      };
      setExtra(newExtra);
      setIsOption(false);
      setLabel("");
      setType("");
      setOptions([]);
      setIndex(-1);

      onClose();
      return;
    }

    newExtra.push({
      label: label,
      name: label,
      type: type,
      options: options,
      value: [],
    });
    setExtra(newExtra);
    setIsOption(false);
    setLabel("");
    setType("");
    setOptions([]);

    onClose();
  };

  useEffect(() => {
    setIsOption(type === "checkbox" || type === "select" ? true : false);
  }, [type]);

  const addOption = () => {
    if (!selectedOption) {
      Toast({
        title: `Option cannot be empty!`,
        status: "error",
        isClosable: true,
      });
      return;
    }
    const newOption = [...options, selectedOption];
    setOptions(newOption);
    setSelectedOption("");
  };

  const EditFields = (index) => {
    onOpen();
    setLabel(extra[index]?.label);
    setType(extra[index]?.type);
    setOptions(extra[index]?.options);
    setIndex(index);
  };

  const deleteFields = (index) => {
    const newExtra = extra.filter((elem) => elem !== extra[index]);
    setExtra(newExtra);
  };

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <DynamicFields
        extra={extra}
        setExtra={setExtra}
        openEditor={EditFields}
        deleteFields={deleteFields}
      />

      <div className="mt-3 mx-3 cursor-pointer rounded border-dashed border-[1px] hover:bg-slate-200 border-slate-300">
        <div
          className="w-full py-3 flex flex-col gap-2 justify-center items-center !text-slate-400"
          onClick={onOpen}
        >
          <p>
            <IoAddCircle size={40} color="#FA650070" />
          </p>
          <p>Add Subsection</p>
        </div>
      </div>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Own Field</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Label</FormLabel>
              <Input
                onChange={(e) => {
                  setLabel(e.target.value);
                }}
                value={label}
                ref={initialRef}
                placeholder="Label"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Type</FormLabel>
              <Select
                onChange={(e) => {
                  setType(e.target.value);
                }}
                value={type}
              >
                <option value="">Select type</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="checkbox">Checkbox</option>
                <option value="select">Dropdown</option>
              </Select>
            </FormControl>
            {isOption ? (
              <FormControl mt={4}>
                <FormLabel>Options</FormLabel>
                <Input
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                  }}
                  value={selectedOption}
                  placeholder="Option"
                />

                <div className="options flex gap-2 mt-4 flex-wrap">
                  <Button
                    onClick={(e) => {
                      addOption();
                    }}
                  >
                    Add
                  </Button>
                  {options.map((option) => (
                    <button
                      className="group bg-blue-100 py-2 hover:bg-[#333] flex justify-center items-center cursor-pointer rounded font-semibold px-6"
                      onClick={() => {
                        const tempOptions = options.filter((elem) => (
                          elem !== option
                        ));
                        setOptions(tempOptions)
                      }}  
                    >
                      {option}
                      <span class="opacity-0 bg-white p-2 rounded-full  absolute group-hover:opacity-100 group-hover:block text-red-400 cursor-pointer">
                      <MdDelete />
                      </span>
                    </button>
                  ))}
                </div>
              </FormControl>
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => pushField()} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FormFieldsCreator;
