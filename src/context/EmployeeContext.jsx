import { createContext, useContext, useEffect, useState } from "react";
import { getEmployeesRequest,getEmployeeRequest,deleteEmployeeRequest, createEmployeeRequest, updateEmployeeRequest } from "../api/Employeeapi";

const EmployeeContext = createContext();
export function EmployeeProvider({ children }) {
    const [employees, setEmployees] = useState(null);
    const [errors,setErrors] = useState([])
    const [messages,setMessages] = useState(null)

    const [isLoading,setIsLoading] = useState(true)

  // Eliminar errores despues de 5 segundos
  useEffect(() => {
    if (errors.length > 0 || messages !== null) {
      const timer = setTimeout(() => {
        setErrors([]);
        setMessages(null)
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors,messages]);

  const getEmployees = async (restaurant_id) => {
    try {
        const res = await getEmployeesRequest(restaurant_id)
        setEmployees(res.data)
        setIsLoading(false)
    } catch (error) {
        console.log(error)
    }
    }

  const deleteEmployee = async (restaurant_id,employee_id) => {
    try {
        const res = await deleteEmployeeRequest(restaurant_id,employee_id)
        if(res.status === 200) setEmployees(employees.filter((employee) => employee.id !== employee_id));
        return res
    } catch (error) {
        console.log(error)        
    }
    }
    
    const getEmployee = async (employee_id) => {
      try {
        const res = await getEmployeeRequest(employee_id); // Utiliza getEmployeesRequest con el ID del empleado
        setIsLoading(false);
        return res;
      } catch (error) {
        console.log(error);
        // Maneja el error aquí
      }
    }
    

  const createEmployee = async (restaurant_id,employee_data) => {
    try {
      const res = await createEmployeeRequest(restaurant_id,employee_data)
      setMessages({ text: "Empleado creado correctamente", color: "success" });
      return res.data
    } catch (error) {
      console.error("Error al crear el empleado:", error);
      setErrors(error.response.data)
    }
  }

  const updateEmployee = async (restaurant_id,employee_id,employee_data)=>{
    try {
      await updateEmployeeRequest(restaurant_id,employee_id,employee_data)
    } catch (error) {
      console.log(error)
    }
      
  }

    return (
        <EmployeeContext.Provider value={{messages,setMessages,isLoading,errors,getEmployee,deleteEmployee,getEmployees,employees,setIsLoading,createEmployee,updateEmployee}}>
      {children}
    </EmployeeContext.Provider>
  );
}



export function useEmployeeContext() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee debe usarse dentro de un AuthProvider");
  }
  return context;
}