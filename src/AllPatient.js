import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    text-align: left;
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

function AllPatient() {
  const [patientData, setPatientData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); 
      setError(null);

      try {
        const response = await axios.get('http://localhost:5106/api/Patient'); 
        const patientData = response.data; 
       
        setPatientData(patientData);
        
      } catch (error) {
        console.error('Error fetching patient:', error);
        setError('An error occurred while fetching patient. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  
  
  
  const navigate = useNavigate();

const handleClick = () => {
  navigate('/add'); 
};

const handleEditClick = (id) => {
  console.log('Edit clicked for id:', id);
};



  return (
    <div>
      {isLoading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}
      {patientData.length > 0 && (

        <Table>
      <thead>
        <tr>
          <th>PatientId</th>
          <th>PatientFName</th>
          <th>PatientLName </th>
          <th>Age</th>
          <th>Appointment Date</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Body Part</th>
          <th>Exsisting Disease</th>
          <th>DOB</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
        {patientData.map((item) => (
          <tr key={item.patientId}>
            <td>{item.patientId}</td>
            <td>{item.patientFName}</td>
            <td>{item.patientLName}</td>
            <td>{item.age}</td>
            <td>{moment(item.appointmentDate ).format('DD-MM-YYYY')}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{item.bodyPart}</td>
            <td>{item.exsistingDisease}</td>
            <td>{moment(item.dob).format('DD-MM-YYYY')}</td>
            {/* <td>
              <button onClick={() => handleEditClick(item.patientId)}>Edit</button>
              <button onClick={() => handleDeleteClick(item.patientId)}>Delete</button>
            </td> */}

            
          </tr>
        ))}
      </tbody>
    </Table>
      )}



<button onClick={handleClick}>Register Patient</button>
    </div>

  );
}

export default AllPatient;