import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import deleteIcon from "../assets/icon-delete.png";
import moment from "moment";
import Swal from "sweetalert2";
import {
  createEventsReq,
  getEventsReq,
  updateEventReq,
  deleteEventsReq,
} from "../services/api";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

// const eventStyleGetter = (event) => {
//   const isEventInPast = moment(event.start).isBefore(moment(), 'day');
//   const style = {
//     background: isEventInPast ? 'red' : '#faab3b', // Red for past events, original color for others
//     borderColor: 'darkblue',
//   };
//   return { style };
// }

function InspectionCalendar({ width, height, views, toggleRefreshUpcomingInspection }) {
  const [events, setEvents] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const navigate = useNavigate();

  function getTodayISOString() {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().slice(0, -8);
  }

  useEffect(() => {
    events?.map((event) => {
      event.start = new Date(event.start);
      event.end = new Date(event.end);
      event["calendarStart"] = moment(event.start).format(
        "YYYY-MM-DDTHH:mm:ss.SSS"
      );
      event["calendarEnd"] = moment(event.end).format(
        "YYYY-MM-DDTHH:mm:ss.SSS"
      );
    });
  }, [events]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const res = await getEventsReq(localStorage.getItem("userId"));
    setEvents(res.events);
  };

  const createEvents = async (event) => {
    const userId = localStorage.getItem("userId");
    const eventData = { userId: userId, events: [event] };
    const res = await createEventsReq(userId, eventData);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Inspection Scheduled",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      // console.log(res.events);
      navigate('/dashboard');
      setEvents(res.events);
      toggleRefreshUpcomingInspection();
    }
  };

  const updateEvents = async (updateEvent, eventId) => {
    const userId = localStorage.getItem("userId");
    const res = await updateEventReq(userId, eventId, updateEvent);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Inspection Scheduled Updated",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      navigate('/dashboard');
      setEvents(res.events);
      toggleRefreshUpcomingInspection();
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    const newEvent = {
      title: "",
      start,
      end,
    };
    const startDate = new Date(start);
    const currentDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    if (startDate < currentDate) {
      Swal.fire({
        icon: "error",
        title: "Please select a date from the present or a future date",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      input: "text",
      inputPlaceholder: "Title",
      title: "Create Event",
      html: `
          <p class="mt-2 text-left text-sm text-slate-600">Start Time :</p>
          <input id="startTime" type="datetime-local" class="w-[100%] border-2 p-2" placeholder="Inspection title" min=${getTodayISOString()}> 
          <p class="mt-2 text-left text-sm text-slate-600">End Time :</p>
          <input id="endTime" type="datetime-local" class="w-[100%] border-2 p-2" placeholder="Inspection title">
          `,
      confirmButtonText: "Create",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      didOpen: () => {
        document.querySelector("#startTime").value =
          moment(start).format("YYYY-MM-DDTHH:mm");
        document.querySelector("#endTime").value =
          moment(end).format("YYYY-MM-DDTHH:mm");
      },
      preConfirm: () => {
        const title = Swal.getPopup().querySelector("#swal2-input").value;
        const startTime = Swal.getPopup().querySelector("#startTime").value;
        const endTime = Swal.getPopup().querySelector("#endTime").value;
        const startingtime = new Date(startTime);
        startingtime.setHours(0, 0, 0, 0);
        if (!title.trim()) {
          Swal.showValidationMessage("Please enter a non-empty event title");
        } else if (!startTime || !endTime) {
          Swal.showValidationMessage("Please select both start and end dates");
        } else if (startTime >= endTime) {
          Swal.showValidationMessage(
            "End time should be greater than start time"
          );
        } else if (startingtime < currentDate) {
          Swal.showValidationMessage("Event start time cannot be in the past");
        } else {
          newEvent.title = title;
          newEvent.start = new Date(startTime);
          newEvent.end = new Date(endTime);

          if (newEvent.start > newEvent.end) {
            Swal.fire({
              title: `Invalid date. `,
              toast: true,
              position: "top-end",
              icon: "error",
              showConfirmButton: false,
              timer: 5000,
            });
            return;
          }
          createEvents(newEvent);
          Swal.fire({
            title: "Scheduling inspection....",
            toast: true,
            position: "top-end",
            icon: "info",
            showConfirmButton: false,
          });
        }
      },
    });
  };

  const deleteEvent = async (eventId) => {
    const userId = localStorage.getItem("userId");
    const res = await deleteEventsReq(userId, eventId);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Inspection Deleted Successfully",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      setEvents(res.events);
      toggleRefreshUpcomingInspection();
    }
  };

  const handleSelectEvent = (event) => {
    console.log(event);
    const { title, calendarStart, calendarEnd, street, city, state, zipCode } =
      event;
    const updateEvent = {
      title,
      start: calendarStart,
      end: calendarEnd,
      street,
      city,
      state,
      zipCode,
    };

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    Swal.fire({
      title: "Update Event",
      input: "text",
      inputPlaceholder: "Title",
      html: `
        <p class="mt-2 text-left text-sm text-slate-600">Start Time :</p>
        <input id="startTime" type="datetime-local" class="w-[100%] border-2 p-2" placeholder="Inspection title" min=${getTodayISOString()}> 
        <p class="mt-2 text-left text-sm text-slate-600">End Time :</p>
        <input id="endTime" type="datetime-local" class="w-[100%] border-2 p-2" placeholder="Inspection title">
      `,
      footer: `<button id="deleteButton" class="swal2-confirm swal2-styled absolute top-0 right-0" style="background-color: transparent"><img src=${deleteIcon} class="w-[40px]" /></button>`,
      confirmButtonText: "Update",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      didOpen: () => {
        Swal.getInput().value = updateEvent.title;
        document.querySelector("#startTime").value = updateEvent.start;
        document.querySelector("#endTime").value = updateEvent.end;
      },
      preConfirm: () => {
        const title = Swal.getPopup().querySelector("#swal2-input").value;
        const startTime = Swal.getPopup().querySelector("#startTime").value;
        const endTime = Swal.getPopup().querySelector("#endTime").value;
        const startingTime = new Date(startTime);
        startingTime.setHours(0, 0, 0, 0);

        if (!title) {
          Swal.showValidationMessage("Please enter the event title");
        } else if (!startTime || !endTime) {
          Swal.showValidationMessage("Please select both start and end dates");
        } else if (startTime > endTime) {
          Swal.showValidationMessage(
            "End time should be greater than start time"
          );
        } else if (startingTime < currentDate) {
          Swal.showValidationMessage("Event cannot start in the past");
        } else {
          updateEvent.title = title;
          updateEvent.start = new Date(startTime);
          updateEvent.end = new Date(endTime);

          updateEvents(updateEvent, event._id);

          Swal.fire({
            title: "Update on progress....",
            toast: true,
            position: "top-end",
            icon: "info",
            showConfirmButton: false,
          });
        }
      },
    });

    document.getElementById("deleteButton").onclick = () => {
      deleteEvent(event._id);

      Swal.fire({
        title: "Delete on progress....",
        toast: true,
        position: "top-end",
        icon: "info",
        showConfirmButton: false,
      });
    };
  };

  const eventStyleGetter = (event) => {
    const isEventInPast = moment(event.end).isBefore(moment(), "day");
    const style = {
      background: isEventInPast ? "#daafba" : "#faab3b",
      borderColor: "darkblue",
    };
    return { style };
  };

  const handleScheduleInspection = (e) => {
    if (e.action == "select") return;

    console.log(e);

    setStartDate(e.start);
    setEndDate(e.end);

    const selectedDate = new Date(startDate);
    const currentDate = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (new Date(e.start).setHours(0, 0, 0, 0) < currentDate) {
      Swal.fire({
        icon: "error",
        title: "Please select a date from the present or a future date",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    } else {
      onOpen();
    }
  };

  const todayStyle = {
    backgroundColor: "#CFAFFF",
  };

  const customCalendarStyle = {
    border: "none",
  };

  const InspectionSchedularForm = ({ startDate, endDate, onClose }) => {
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(endDate);
    
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [valiadtionMessage, setvaliadtionMessage] = useState("* Required Field")

    function validateForm() {
      if(!name.trim()) {
        setvaliadtionMessage("Name is required")
        return false;
      }else if(!street.trim()){
        setvaliadtionMessage("Street is required")
        return false;
      }else if(!city.trim()){
        setvaliadtionMessage("City is required")
        return false;
      }else if(!state.trim()){
        setvaliadtionMessage("State is required")
        return false;
      }else if(!zipCode.trim()){
        setvaliadtionMessage("Zipcode is required")
        return false;
      }
      return true;
    }

    function scheduleInspection() {
      if (!validateForm()) {
        return;
      }
      const newEvent = {
        title: name,
        street: street,
        city: city,
        state: state,
        zipCode: zipCode,
        start: moment(start).format("YYYY-MM-DDTHH:mm"),
        end: moment(end).format("YYYY-MM-DDTHH:mm"),
      };

      createEvents(newEvent);

      Swal.fire({
        title: "Scheduling inspection....",
        toast: true,
        position: "top-end",
        icon: "info",
        showConfirmButton: false,
      });

      onClose();
    }

    return (
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Schedule Inspection</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired >
                <FormLabel >Name</FormLabel>
                <Input
                  name="name"
                  ref={initialRef}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Street</FormLabel>
                <Input
                  name="street"
                  placeholder="Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  name="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>State</FormLabel>
                <Input
                  name="state"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4} isRequired >
                <FormLabel>Zip/Postal Code</FormLabel>
                <Input
                  name="zipCode"
                  placeholder="Zip code"
                  value={zipCode}
                  type="number"
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </FormControl>
              <Box mt="4"  color="red"  >{valiadtionMessage} </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => {
                  scheduleInspection();
                }}
                colorScheme="blue"
                mr={3}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <div>
      <Calendar
        className="rounded-lg text-slate-500"
        localizer={localizer}
        messages={{
          previous: "<",
          next: ">",
        }}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleScheduleInspection}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={(date) => {
          if (moment(date).isSame(moment(), "day")) {
            return { style: todayStyle };
          }
        }}
        style={{ height: height, width: width, border: "none" }}
        views={views}
        defaultView="month"
      />

      <InspectionSchedularForm
        startDate={startDate}
        endDate={endDate}
        onClose={onClose}
      />
    </div>
  );
}

export default InspectionCalendar;
