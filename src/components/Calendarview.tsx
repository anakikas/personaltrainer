import { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import TrainingPopup from './TrainingPopup';

const localizer = dayjsLocalizer(dayjs);
dayjs.locale('fi');

function Calendarview() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<any>('month');

  useEffect(() => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings')
      .then(response => response.json())
      .then(data => {
        const calendarEvents = data._embedded.trainings.map((training: any) => ({
          title: training.activity,
          start: new Date(training.date),
          end: dayjs(training.date).add(training.duration, 'minute').toDate(),
        }));

        setEvents(calendarEvents);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ height: '800px', width: '100%' }}>
    <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={{
          month: true,
          week: true,
          day: true,
        }}
        view={view}
        date={date}
        culture="fi"
        onView={(newView: any) => {
          console.log('VIEW:', newView);
          setView(newView);
        }}
        onNavigate={(newDate) => {
          console.log('DATE:', newDate);
          setDate(newDate);
        }}
        selectable
        onSelectSlot={(slotInfo: any) => {
        setSelectedDate(slotInfo.start);
        setSelectedEvent(null);
        setOpen(true);
        }}
        onSelectEvent={(event: any) => {
        setSelectedEvent(event);
        setSelectedDate(null);
        setOpen(true);
        }}
        style={{ height: 800 }}
        />

        <TrainingPopup
            isOpen={open}
            onClose={() => setOpen(false)}
            date={selectedDate}
            event={selectedEvent}
            onSave={(newEvent) => {
            setEvents([...events, newEvent]);
            setOpen(false);
            }}
        />      
    </div>
  );
}

export default Calendarview;