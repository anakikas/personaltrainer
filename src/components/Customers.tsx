import {useState, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import { Button, Box, Snackbar } from '@mui/material';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';

export default function Customers () {


    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
 
    useEffect(() => {fetchData(); }, []);

    const fetchData = () =>{
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            .then(response =>response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
      if (window.confirm('Are you sure?')) {
        fetch(link, { method: 'DELETE' })
          .then(() => {
            fetchData();
            setOpen(true);
          })
          .catch(err => console.error(err));
      }
    };

    const saveCustomer = (customer) => {
      fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
      })
        .then(() => fetchData())
        .catch(err => console.error(err));
    };
    
    const editCustomer = (customer, link) => {
      fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify(customer)
      })
        .then(() => fetchData())
        .catch(err => console.error(err));
    };

    const columns = [

        {field: 'firstname',headerName: 'First name',width: 120},
        {field: 'lastname',headerName: 'Last name',width: 120},
        {field: 'streetaddress',headerName: 'Street address',width: 160},
        {field: 'postcode',headerName: 'Postcode',width: 90},
        {field: 'city',headerName: 'City',width: 100},
        {field: 'email',headerName: 'Email',width: 160},
        {field: 'phone',headerName: 'Phone',width: 130},
        {
          field: 'edit',
          headerName: 'Edit',
         width: 90,
         sortable: false,
         renderCell: (params: any) => (
         <Editcustomer customer={params.row} editCustomer={editCustomer} />
        )
        },
      {
          field: 'delete',
          headerName: 'Delete',
          width: 100,
          sortable: false,
          renderCell: (params: any) => (
            <Button
              color="error"
              size="small"
              onClick={() => deleteCustomer(params.row._links.self.href)}
            >Delete</Button>
          )
        }
        
      ];

    return (
    <Box sx={{ p:2}}>

      <Addcustomer addCustomer={saveCustomer} />

        <DataGrid
              rows={customers}
              columns={columns}
              getRowId={(row) => row._links.self.href}
            />

            <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="Customer deleted"
            />
    </Box>
    )
  }