import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [timeInput, setTimeInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleTimeInputChange = (e) => {
    setTimeInput(e.target.value);
  }

  const handleAddEvent = () => {
    const selectedDateTime = moment(selectedDate).set({
      hours: moment(timeInput, 'HH:mm').hours(),
      minutes: moment(timeInput, 'HH:mm').minutes(),
      seconds: 0,
      milliseconds: 0,
    }).toDate();

    setEvents([...events, {
      title: 'New Event',
      start: selectedDateTime,
      end: moment(selectedDateTime).add(1, 'hour').toDate(),
    }]);

    // Clear the time input field
    setTimeInput('');
  }

  return (
    <div>
      <div>
        <label>Date:</label>
        <input
          type="datetime-local"
        //   value={moment(selectedDate).format('YYYY-MM-DD')}
          onChange={(e) => {setSelectedDate(new Date(e.target.value)); console.log(selectedDate)}}
        />
      </div>

      <button onClick={handleAddEvent}>Add Event</button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
            height: '600px'
        }}
        // Other props for your calendar
      />
    </div>
  );
}

export default MyCalendar;
