import React, { useState } from 'react';
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Addtraining(props) {
    
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
  
    const [training, setTraining] = useState({
      activity: '',
      duration: '',
      customerName: ''
    });
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (event) => {
      setTraining({ ...training, [event.target.name]: event.target.value });
    };
  
    const handleSave = () => {
      props.addTraining({ ...training, date: selectedDate });
      handleClose();
      setTraining({ activity: '', duration: '', customerName: '' });
      setSelectedDate(null);
    };
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          ADD
        </Button>
  
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Training</DialogTitle>
  
          <DialogContent>
            <DialogContentText>
              Fill in new training information
            </DialogContentText>
  
            <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/DD/YYYY; hh:mm"
            showTimeSelect
            timeIntervals={30}
            timeFormat="hh:mm"
            placeholderText="Select date"
            withPortal
            />
            <TextField
            margin="dense"
            name="activity"
            label="Activity"
            fullWidth
            value={training.activity}
            onChange={handleChange}
            />
            <TextField
            margin="dense"
            name="duration min"
            label="Duration (min)"
            fullWidth
            value={training.duration}
            onChange={handleChange}
            />
            <TextField
            margin="dense"
            name="customerName"
            label="Customer name"
            fullWidth
            value={training.customerName}
            onChange={handleChange}
            />
          </DialogContent>
  
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
