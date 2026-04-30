import {useState, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import { TextField, Box } from '@mui/material';

export default function Customers () {


    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(),[]);

    const fetchData = () =>{
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            .then(response =>response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }

    const columns = [

        {
          field: 'firstname',headerName: 'First name',width: 120},
        {
          field: 'lastname',headerName: 'Last name',width: 120},
        {
          field: 'streetaddress',headerName: 'Street address',width: 200},
        {
          field: 'postcode',headerName: 'Postcode',width: 120},
        {
          field: 'city',headerName: 'City',width: 100},
        {
          field: 'email',headerName: 'Email',width: 200},
        {
          field: 'phone',headerName: 'Phone',width: 130}
        
      ];

    return (
        <DataGrid
              rows={customers}
              columns={columns}
              getRowId={(row) => row._links.self.href}
            />
    )
  }