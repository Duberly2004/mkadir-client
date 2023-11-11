import axios from './axiosConfig.js'


export const getEmployeeRequest = async (restaurant_id) =>
 await axios.get(`restaurants/${restaurant_id}/employees`)

export const getEmployeeDetails = async (restaurant_id, employee_id) => 
{return await axios.get(`restaurants/${restaurant_id}/employees/${employee_id}`)};


export const getEmployeesRequest = async (restaurant_id) => 
await axios.get(`restaurants/${restaurant_id}/employees/`)

export const createEmployeeRequest = async (restaurant_id, employee_data) => 
{ return await axios.post(`restaurants/${restaurant_id}/employees/create/`, employee_data)};
  
  // Eliminar un empleado en un empleado específico
  export const deleteEmployeeRequest = async (restaurant_id, employee_id) => 
  { return await axios.delete(`restaurants/${restaurant_id}/employees/delete/${employee_id}`)};
  
  // Actualizar los datos de un empleado en un restaurante específico
  export const updateEmployeeRequest = async (restaurant_id, employee_id, employee_data) => 
   await axios.put(`restaurants/${restaurant_id}/employees/update/${employee_id}/`, employee_data)