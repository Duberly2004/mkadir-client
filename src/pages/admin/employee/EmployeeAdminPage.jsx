import React, { useState, useEffect } from 'react';
import SearchComponent from '../../../components/SearchComponent';
import { Link, Outlet, useNavigate,useParams } from 'react-router-dom';
import { useEmployeeContext } from '../../../context/EmployeeContext';
import SpinerComponent from '../../../components/SpinerComponent';
import RestaurantDoc from '../../../components/documentation/RestaurantDoc';
export default function EmployeeAdminPage() {
    const { employees,getEmployees ,isLoading} = useEmployeeContext()
    const [search, setSearch] = useState('');
    const navigateTo = useNavigate()
    const { employee_id } = useParams()

    const searcher = (e) => {
        setSearch(e.target.value);
    };
        // FILTER DATA
    const results = !search ? employees : employees.filter((dato)=>dato.name.toLowerCase().includes(search.toLowerCase()))

    const handleGetEmployee=(employee_id)=>{
        return navigateTo(`/admin/employees/update/${employee_id}`)
    }

    useEffect(() => {
        if (employee_id) {
          getEmployee(employee_id);
        } else {
            console.log("No se ha mostrado los empleados.");
        }
      }, [employee_id, getEmployees]);
      

    if (employee_id) return <Outlet/>
    return (
        <div className="overflow-x-auto mx-1">
            <h1 className="text-2xl my-5 text-center">Administrar mis Empleados</h1>
            {isLoading? <div className='mt-10'><SpinerComponent/></div>: 
            results?
            results.length > 0 ? 
            <div className="max-w-full text-end overflow-hidden">
                <SearchComponent value={search} onChange={searcher} />
                    <div className='flex justify-end'>
                        <Link to="/admin/employees/create" className='mt-2 py-2 px-4 bg-color-primary text-white rounded mr-2'>+ Nuevo</Link>
                    </div>
                <div className='overflow-x-auto '>    
                    <table style={{ width:"900px" }}  className="min-w-full mt-4 bg-white border text-center">
                        <thead>
                            <tr className='bg-green-200 '>
                                <th className="px-4 py-2 border border-white text-gray-600">#</th>
                                <th className="px-4 py-2 border border-white text-gray-600">Perfil</th>
                                <th className="px-4 py-2 border border-white text-gray-600">User</th>
                                <th className="px-4 py-2 border border-white text-gray-600">Rol</th>
                                <th className="px-4 py-2 border border-white text-gray-600">Dni</th>
                                <th className="px-4 py-2 border border-white text-gray-600">Dirección</th>
                                <th className="px-4 py-2 border border-white text-gray-600">Edad</th>
                                <th className="px-4 py-2 border border-white text-gray-600">Telefono</th>

                            </tr>
                        </thead>
                        <tbody>
                            {results.map((employee, index) => (
                                <tr onClick={()=>handleGetEmployee(employee.id)} key={index} className="hover:bg-gray-200 text-center cursor-pointer">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                        <div className='flex justify-center items-center'>
                                        {employee.logo_url !== null && employee.logo_url.trim() === ''?
                                            <div style={{ width:"50px",height:"50px"  }} className='border-4 rounded-full flex justify-center items-center bg-color-primary'>
                                                <p className='text-2xl text-white'>{employee.name.charAt()}</p>
                                            </div>      
                                            :
                                            <img className="w-10 h-10 object-cover rounded-full ring-gray-300 dark:ring-gray-500"  src={employee.logo_url} alt="Medium avatar"/>
                                        }
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">{employee.name}</td>
                                    <td className="border px-4 py-2">{employee.role}</td>
                                    <td className="border px-4 py-2">{employee.dni}</td>
                                    <td className="border px-4 py-2">{employee.address}</td>
                                    <td className="border px-4 py-2">{employee.age}</td>
                                    <td className="border px-4 py-2">{employee.phone}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>   
                </div>

            </div>
            :<div className='text-center'>
                <RestaurantDoc linkButton="/admin/restaurants/create" title="Registra un restaurante"/>
            </div>:null}
        </div>
    );
}

