import { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';

const localizer = dayjsLocalizer(dayjs);

function Calendarview() {
  const [events, setEvents] = useState([]);
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
        onView={(newView: any) => {
          console.log('VIEW:', newView);
          setView(newView);
        }}
        onNavigate={(newDate) => {
          console.log('DATE:', newDate);
          setDate(newDate);
        }}
        style={{ height: 800 }}
        />      
    </div>
  );
}

export default Calendarview;