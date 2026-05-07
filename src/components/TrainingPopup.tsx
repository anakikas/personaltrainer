import { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

export default function TrainingPopup({ isOpen, onClose, onSave, date, event }) {

    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    useEffect(() => {
        if (event) {
            setTitle(event.title || "");
            setStart(event.start.toISOString().slice(0, 16));
            setEnd(event.end.toISOString().slice(0, 16));
        } else if (date) {
            const defaultStart = new Date(date);
            const defaultEnd = new Date(defaultStart.getTime() + 60 * 60 * 1000); // 1 hour later
            setStart(defaultStart.toISOString().slice(0, 16));
            setEnd(defaultEnd.toISOString().slice(0, 16));
            setTitle("");
        }
    }, [date, event]);

    const handleSubmit = () => {
        onSave({
            id: event?.id,
            title,
            start: new Date(start),
            end: new Date(end),
        });

        onClose();
    };


    return (

        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{event ? 'Edit Training' : 'Add Training'}</DialogTitle>
  
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
  
          <TextField
            margin="dense"
            label="Start"
            type="datetime-local"
            fullWidth
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
  
          <TextField
            margin="dense"
            label="End"
            type="datetime-local"
            fullWidth
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </DialogContent>
  
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }