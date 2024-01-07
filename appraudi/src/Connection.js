import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MaConnection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/projetNodejsIPSSI/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erreur de requête:', error);
      });
  }, []);

  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MaConnection;
