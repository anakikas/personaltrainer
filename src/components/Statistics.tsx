import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Statistics() {

    const [data, setData] = useState<any[]>([]);
  
    useEffect(() => {
      fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings')
        .then(response => response.json())
        .then(data => {
  
          const trainings = data._embedded.trainings;
  
          const result = trainings.map((training: any) => ({
            activity: training.activity,
            duration: training.duration
          }));
  
          setData(result);
        });
    },
[]);

  return (
    <div
    style={{
      width: '100%',
      height: '600px',
      display: 'flex',
      justifyContent: 'center',
      padding: '40px',
      boxSizing: 'border-box'
    }}
    >
    <BarChart
      width={1100}
      height={500}
      data={data}
      margin={{ top: 20, right: 30, left: 30, bottom: 90 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="activity" angle={-35} textAnchor="end" interval={0} />
      <YAxis label={{ value: 'min', angle: 0, position: 'insideLeft' }} />
      <Tooltip />
      <Legend verticalAlign="bottom"  wrapperStyle={{ bottom: 0 }}/>
      <Bar dataKey="duration" name="Trainings" fill="#8884d8" activeBar={{ fill: 'pink', stroke: 'blue' }} />
      
    </BarChart>
    </div>
  );
};

export default Statistics;