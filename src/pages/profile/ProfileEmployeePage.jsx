import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeDetails } from '../../api/Employeeapi';

export default function ProfileEmployeePage() {
  const { restaurant_id, employee_id } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await getEmployeeDetails(restaurant_id, employee_id);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [restaurant_id, employee_id]);

  return (
    <div className="w-full mx-auto h-full shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-2xl my-5 text-center">Mi perfil Empleado</h1>
      <div className="bg-gray-300 h-40"></div>
      <div className="py-4 px-6 text-center">
        {!employee.user ? 
          <div className='flex justify-center items-center'>
            <div style={{ width: "100px", height: "100px" }} className='border-4 rounded-full flex justify-center items-center bg-color-primary w-32 h-32 sm:w-32 sm:h-32 border-white -mt-12 sm:-mt-16 mx-auto"'>
              <p className='text-5xl text-center text-white'>
                {employee.user && employee.user.name.charAt() + employee.user.paternal_surname.charAt()} </p>
            </div>
          </div>
         : 
          <img src={employee.user.picture} alt="Profile Picture" className="w-32 h-32 sm-w-32 sm-h-32 rounded-full border-4 border-white -mt-12 sm-mt-16 mx-auto" />
        }
        <p className="text-lg font-semibold mb-2">
          {employee.user && `${employee.user.name} ${employee.user.paternal_surname || ''} ${employee.user.maternal_surname || ''}`}
        </p>
        <p className="text-lg font-semibold mb-2 color-text-primary m-2">{employee.role ?  employee.role.name :'Rol no especificado'}</p>

        <h1 className="text-lg font-semibold mb-2">Información Personal</h1>
        <div className="py-4 px-6 text-center">
        <p>DNI: {employee.user && employee.dni ? employee.dni : 'DNI no especificado'}</p>
        <p>DIRECCIÓN: {employee.user && employee.address ? employee.address : 'Dirección no especificada'}</p>
        <p>EDAD: {employee.user && employee.age ? employee.age : 'Edad no especificada'}</p>
        <p>TELÉFONO: {employee.user && employee.phone ? employee.phone : 'Teléfono no especificado'}</p>
    </div>    
    </div>
    </div>
  );
}
