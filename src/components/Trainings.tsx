import {useState, useEffect} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { TextField, Box } from '@mui/material';

export default function Trainings () {

    const [trainings, setTrainings] = useState([]);
   
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
        const data = await response.json();
        const rawTrainings = data._embedded.trainings;
    
        const trainingsWithCustomer = await Promise.all(
          rawTrainings.map(async (training: any) => {
            const customerRes = await fetch(training._links.customer.href);
            const customerData = await customerRes.json();
            return {
              ...training,
              customerName: `${customerData.firstname} ${customerData.lastname}`
            };
          })
        );
    
        setTrainings(trainingsWithCustomer);
      };
    
      fetchData();
    }, []);

    const columns = [

        {
          field: 'date',
          headerName: 'Date',
          width: 180,
          valueFormatter: (params) => dayjs(params.value).format('DD.MM.YYYY HH:mm')},
        {
          field: 'duration',headerName: 'Duration',width: 180,},
        {
          field: 'activity',headerName: 'Activity',width: 180,},
        {
          field: 'customerName',headerName: 'Customer',width: 180,},
      ];


    return (
        <DataGrid
          rows={trainings}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
        />
    )
}