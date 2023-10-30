import React, { useState, useEffect } from 'react';
import CardEmployees from '../../../components/cards/CardEmployees';
import { getEmployeesRequest } from '../../../api/Employeeapi';
import { useParams } from 'react-router-dom';

export default function GetEmployeesPage() {
  const { restaurant_id } = useParams()
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEmployeesRequest(restaurant_id);
      console.log(response)
      setEmployees(response.data);
    };
  
    fetchData();
  }, [restaurant_id]);
  

  return (
    <div className="m-2 mt-4">
      <h2 className="text-2xl my-5 text-center">Personal</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
        {employees.map((employee) => (
          <CardEmployees
            key={employee.id}
            restaurant_id={restaurant_id}
            employee_id={employee.id}
            card_img= {employee.user.picture}
            card_user = {`${employee.user.name} ${employee.user.paternal_surname} ${employee.user.maternal_surname}`}
            card_role = {employee.role.name}
            
          />
        ))}
      </div>
    </div>
  );
}
