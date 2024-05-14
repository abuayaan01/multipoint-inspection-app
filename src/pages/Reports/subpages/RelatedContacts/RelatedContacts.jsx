import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import SaveButton from "../../../../components/SaveButton";
import CustomCheckboxGroup from "../../../../components/CheckboxGroup";
import { Card, Text, Heading, CardBody, Stack, Image, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useComponent } from "../../../../Context/ComponentContext";
import { Center, Circle } from "@chakra-ui/react";
import { updateDeatilsReq } from "../../../../services/api";
import { deleteContact } from "../../../../services/api";
import Swal from "sweetalert2";

function RelatedContacts({ toggleRefresh, contacts, id }) {
  const [contactData, setContactData] = useState(contacts);
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setCurrentComponentName } = useComponent();
  const { register, handleSubmit, setValue, control } = useForm();

  useEffect(() => {
    setCurrentComponentName("Related Contacts");
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const contact = {
      contact: [data],
    };
    await updateDeatilsReq(id, contact).then((res) => {
      console.log(res);
      if (res.status == 200) {
        Swal.fire({
          icon: "success", // You can use 'success', 'error', 'warning', 'info', etc.
          title: "Saved",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
        setShowContactForm(false);
        toggleRefresh();
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    setContactData(contacts);
    console.log(contacts)
  }, [contacts]);

  const deleteContactReq = async (contactId) => {
    // console.log(id,contactId)
    await deleteContact(id, contactId).then((res) => {
      if (res.status == 200) {
        Swal.fire({
          icon: "success", // You can use'success', 'error', 'warning', 'info', etc.
          title: res.msg,
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
        toggleRefresh();
      }
      else {
        Swal.fire({
          icon: "error", // You can use'success', 'error', 'warning', 'info', etc.
          title: res.msg,
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    }).catch((e) => {console.log(e)});
  }

  const roleOptions = [
    "",
    "Buyer Agent",
    "Seller Agent",
    "Buyer/Client",
    "Bank",
    "Insurance Agent",
    "Real Estate Attorney",
    "Mortgage Broker",
    "Sponsoring Inspector",
    "Seller",
    "Friend",
  ];

  const typeOptions = [
    "",
    "Client",
    "Inspector",
    "Mortgage Broker",
    "Real Estate Attorney",
    "Friend",
    "Realtor",
    "Insurance Agent",
    "Bank",
  ];

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <>
      {!showContactForm ? (
        <div className="toolbar text-slate-100 flex flex-col">
          <Center
            className="rounded-lg flex flex-col gap-5 border border-slate-300 bg-slate-200 cursor-pointer"
            h="200px"
            color="white"
            onClick={() => setShowContactForm(!showContactForm)}
          >
            <Circle bg="grey" w="40px" h="40px">
              <Center>
                <p className="text-3xl mb-[5px]">+</p>
              </Center>
            </Circle>
            <p className="text-slate-600">Add Contacts</p>
          </Center>
          <div className="savedContacts mt-10 flex flex-wrap gap-5">
            {/* <p className="text-slate-700">Saved Contacts</p> */}
            {contactData &&
              contactData.map((contact, idx) => {
                return (
                  <div key={idx}>
                    <Card
                      key={idx}
                      className="my-2 max-h-[300px] min-h-[300px]"
                      maxW="195px"
                    >
                      {" "}
                      <Image
                        objectFit="cover"
                        maxW="100%"
                        maxH="150px"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                        alt="Caffe Latte"
                      />
                      <Stack>
                        <CardBody
                          className="contact-card-scroll overflow-y-scroll max-h-[120px]"
                        >
                          <Heading size="xs">
                            {" "}
                            {contact.firstName + " " + contact.lastName}
                          </Heading>

                          {contact.role ? (
                            <Text fontSize="xs"> Role: {contact.role}</Text>
                          ) : null}
                          {contact.type ? (
                            <Text fontSize="xs"> Type: {contact.type}</Text>
                          ) : null}

                          {contact.address[0].street ||
                            contact.address[0].city ||
                            contact.address[0].state ||
                            contact.address[0].zipCode ? (
                            <Text fontSize="xs" >
                              Address: {" "}
                              {contact.address[0].street}
                              {contact.address[0].city ? (
                                <>{contact.address[0].city} </>
                              ) : null}
                              {contact.address[0].state ? (
                                <>{contact.address[0].state} </>
                              ) : null}
                              {contact.address[0].zipCode ? (
                                <>{contact.address[0].zipCode} </>
                              ) : null}
                            </Text>
                          ) : null}
                        </CardBody>
                          <Button onClick={() => deleteContactReq(contact._id)} className="!bg-red-300 hover:!bg-red-500 !rounded-none !text-slate-200">Delete</Button>
                      </Stack>


                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <form className="editForm" onSubmit={handleSubmit(onSubmit)}>
          <p className="leading-normal text-center uppercase darktext-white darkopacity-60 text-md">
            Add Contact
          </p>

          <Input
            label="First Name"
            name={"firstName"}
            register={register}
            required
          />
          <Input
            label="Last Name"
            name={"lastName"}
            register={register}
            required
          />
          <Input
            label="Email"
            name={"email"}
            register={register}
            type="email"
            required

          />
          <Input
            label="Phone"
            name={"phone"}
            register={register}
            required
            type="number"

          />

          <div className="flex">
            <Controller
              name="type"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select label={"Type"} field={field} options={typeOptions} />
              )}
            />
            <Controller
              name="role"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select label={"Role"} field={field} options={roleOptions} />
              )}
            />
          </div>

          {/* <div>
            <Controller
              name="available"
              control={control}
              render={({ field }) => (
                <CustomCheckboxGroup
                  label={"Available :"}
                  name="available"
                  options={options}
                  control={control}
                />
              )}
            />
          </div> */}

          <p className="text-slate-600 py-5 leading-normal mx-4 uppercase darktext-white darkopacity-60 text-sm">
            Address
          </p>

          <Input label="Street" required name={"address.street"} register={register} />
          <Input label="City" required name={"address.city"} register={register} />
          <Input label="State" required name={"address.state"} register={register} />
          <Input
            label="Zip / Postal Code"
            name={"address.zipCode"}
            register={register}
            required
            type="number"
          />

          <div className="py-5 flex items-center mx-3 space-x-5">
            <button
              className="bg-red-400 text-white px-5 py-1 rounded"
              onClick={() => setShowContactForm(!showContactForm)}
            >
              Cancel
            </button>
            <SaveButton loading={loading} />
          </div>
        </form>
      )}
    </>
  );
}

export default RelatedContacts;
