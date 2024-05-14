import React from "react";
import { getEventsReq } from "../../services/api";
import { CreateNewInspection, deleteEventsReq } from "../../services/api";
import { BsFillCalendar2EventFill } from "react-icons/bs";
import Swal from "sweetalert2";


function UpcomingInspection({ toggleRefreshRecentInspection,refreshUpcomingInspection }) {
  const [events, setEvents] = React.useState();
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));

  const getEvents = async () => {
    const res = await getEventsReq(localStorage.getItem("userId"));
    setEvents(res.events);
  };

  React.useEffect(() => {
    getEvents();
  }, [refreshUpcomingInspection]);

  const createEntry = async (event) => {
    const address = {
      street: event.street,
      city: event.city,
      state: event.state,
      zipCode: event.zipCode,
    };

    const data = {
      userId: userId,
      general: {
        name: event.title,
        number: "",
        address: address,
      },
    };

    await CreateNewInspection(data)
      .then((res) => {
        deleteEvent(event._id);
        Swal.fire({
          icon: "success",
          text: res.data.msg,
          position: "top",
          timer: 2000,
        });
        toggleRefreshRecentInspection();
      })
      .catch((e) => console.log(e));
  };

  const deleteEvent = async (eventId) => {
    const res = await deleteEventsReq(userId, eventId);
    if (res.status === 200) {
      setEvents(res.events);
    }
  };

  function getRandomColor() {
    let color = "hsl(" + Math.random() * 360 + ", 100%, 95%)";
    return color;
  }

  return (
    <div>
      <p className="text-slate-800 font-[600]">Upcoming Inspections</p>
      <div className="uiBody">
        {events && events.length > 0 ? (
          events.map((event) => {
            return (
              <>
                <div className="flex flex-1 rounded-2xl bg-white shadow-md w-[800px] mt-5">
                  <div className="flex flex-1 p-4">
                    <div className="flex flex-1 flex-row justify-between items-center gap-5">
                      <div className="flex justify-center items-center gap-5">
                        <div
                          className={`flex justify-center items-center flex-col p-2 h-[80px] w-[90px] rounded-lg`}
                          style={{ backgroundColor: getRandomColor() }}
                        >
                          <p className="font-semibold text-slate-700">
                            {new Date(event.start).toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </p>
                          <p className="font-bold text-lg text-slate-800">
                            {new Date(event.start).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>

                        <div className="">
                          <div className="">
                            <p className="font-semibold text-md text-slate-800">
                              {event.title}
                            </p>
                            <p className="text-slate-700 text-sm">
                              {event.street},{event.city},{event.state},
                              {event.zipCode}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={() => {
                            createEntry(event);
                          }}
                          className="bg-black text-sm text-slate-100 py-3 px-4 rounded-xl"
                        >
                          + Create inspection
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <>
            <div>
              <div className="!w-[800px] mt-5 p-10 shadow-md bg-white rounded-lg flex flex-col justify-center items-center gap-3">
                <BsFillCalendar2EventFill size={24} color="grey" />
                <p className="text-[grey]">No upcoming inspections</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UpcomingInspection;
