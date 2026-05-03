import {useState, useEffect} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Snackbar, Box, Button } from '@mui/material';
import Addtraining from './Addtraining'

export default function Trainings () {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    
   
    useEffect(() => {fetchData(); }, []);
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


    const deleteTraining = (link) => {
      if (window.confirm('Are you sure?')) {
        fetch(link, { method: 'DELETE' })
          .then(() => {
            fetchData();
            setOpen(true);
          })
          .catch(err => console.error(err));
      }
    };

    const saveTraining = (training) => {
      fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training)
      })
        .then(() => fetchData())
        .catch(err => console.error(err));
    };

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
        {
          field: 'delete',
          headerName: 'Delete',
          width: 100,
          sortable: false,
          renderCell: (params: any) => (
            <Button
              color="error"
              size="small"
              onClick={() => deleteTraining(params.row._links.self.href)}
            >Delete</Button>
          )
        }
      ];


    return (
      <Box sx={{ p:2}}>

       <Addtraining addTraining={saveTraining} />

        <DataGrid
          rows={trainings}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
        />
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Training deleted"
        />
    </Box>
    )
}