import React, { useEffect, useState } from "react";

import {
  useDisclosure,
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
import Swal from "sweetalert2";

function InitialFocus({ setExtra, extra }) {
  const [label, setLabel] = useState();
  const [type, setType] = useState();
  const [options, setOptions] = useState([]);
  const [isOption, setIsOption] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState()

  const Toast = useToast();

  const pushField = () => {


    if(!label){
      Toast({
        title: `Please enter the label`,
        status: "error",
        isClosable: true,
      })

      if(type == ('checkbox' || 'select') && options){
        Toast({
          title: `Please add options`,
          status: "error",
          isClosable: true,
        })
      }

      return;
    }

    const newExtra = [...extra];
    newExtra.push({
      label: label,
      name: label,
      type: type,
      options: options,
      value:[]
    });
    setExtra(newExtra);
    setIsOption(false);
    setLabel('')
    setType('')
    setOptions([]);
    onClose();
  };

  useEffect(() => {
    setIsOption(type === "checkbox" || type === "select" ? true : false);
  }, [type]);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button onClick={onOpen} backgroundColor={"rgb(55 65 81)"}>
        Add Subsection
      </Button>

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
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="checkbox">Checkbox</option>
                <option value="select">Dropdown</option>
              </Select>
            </FormControl>
            {isOption ? (
              <FormControl mt={4}>
                <FormLabel>Options</FormLabel>
                <Input onChange={(e) => {setSelectedOption(e.target.value)}} placeholder="Options" />

                <div className="options flex gap-2 mt-4 flex-wrap">
                  <Button onClick={(e)=>{
                    const newOption = [...options, selectedOption]
                    setOptions(newOption)
                    setSelectedOption(null)
                  }}>Add</Button>
                  {options.map((option) => (
                    <button className="bg-red-100 rounded font-semibold px-6" disabled>{option}</button>
                  ))}
                </div>
              </FormControl>
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button onClick={pushField} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InitialFocus;
