import './App.css'
import Trainings from './components/Trainings'
import Customers from './components/Customers'
import Statistics from './components/Statistics'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Calendarview from './components/Calendarview';

function App() {

  return (
    <div>
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Personal trainer</Typography>
            <Button color="inherit" component={Link} to="/trainings">Trainings</Button>
            <Button color="inherit" component={Link} to="/customers">Customers</Button>
            <Button color="inherit" component={Link} to="/calendar">Calendar</Button>
            <Button color="inherit" component={Link} to="/statistics">Statistics</Button>
        </Toolbar>
      </AppBar>

    <Routes>
      <Route path="/" element={<Navigate to="/customers" />} />
      <Route path="/trainings" element={<Trainings />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/calendar" element={<Calendarview />} />
      <Route path="/statistics" element={<Statistics />} />
    </Routes>
    </div>
  );
}

export default App
