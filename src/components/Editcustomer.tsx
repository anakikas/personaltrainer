import React, { useState } from 'react';
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';

export default function Editcustomer(props) {
    
    const [open, setOpen] = useState(false);
  
    const [customer, setCustomer] = useState({
      firstname: '',
      lastname: '',
      streetaddress: '',
      postcode: '',
      city: '',
      email: '',
      phone: ''
    });
  
    const handleClickOpen = () => {
      setCustomer(props.customer);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (event) => {
      setCustomer({ ...customer, [event.target.name]: event.target.value });
    };
  
    const handleSave = () => {
      props.editCustomer(props.customer._links.self.href);
      handleClose();
  
      setCustomer({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
      });
    };
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          EDIT
        </Button>
  
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Customer</DialogTitle>
  
          <DialogContent>
            <DialogContentText>
              Fill in edit customer information
            </DialogContentText>
  
            <TextField
            margin="dense"
            name="firstname"
            label="First name"
            fullWidth
            value={customer.firstname}
            onChange={handleChange}
            />
            <TextField
            margin="dense"
            name="lastname"
            label="Last name"
            fullWidth
            value={customer.lastname}
            onChange={handleChange}
            />
            <TextField
            margin="dense"
            name="streetaddress"
            label="Street address"
            fullWidth
            value={customer.streetaddress}
            onChange={handleChange}
            />
            <TextField
            margin="dense"
            name="postcode"
            label="Postcode"
            fullWidth
            value={customer.postcode}
            onChange={handleChange}
            />
            <TextField
            margin="dense"
            name="city"
            label="City"
            fullWidth
            value={customer.city}
            onChange={handleChange}
            />
            <TextField
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={customer.email}
            onChange={handleChange}
            />
            <TextField
            margin="dense"
            name="phone"
            label="Phone"
            fullWidth
            value={customer.phone}
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
