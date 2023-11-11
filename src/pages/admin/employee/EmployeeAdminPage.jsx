import React, { useState, useEffect } from 'react';
import SearchComponent from '../../../components/SearchComponent';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEmployeeContext } from '../../../context/EmployeeContext';
import SpinerComponent from '../../../components/SpinerComponent';
import EmployeeDoc from '../../../components/documentation/EmployeeDoc';

export default function EmployeeAdminPage() {
    const { employees, getEmployees, isLoading } = useEmployeeContext();
    const [search, setSearch] = useState('');
    const navigateTo = useNavigate();
    const { restaurant_id, employee_id } = useParams(); // Obtenemos restaurant_id de la URL

    const searcher = (e) => {
        setSearch(e.target.value);
    };

    // FILTER DATA
    const results = !search ? employees : employees.filter((employee) => employee.user.name.toLowerCase().includes(search.toLowerCase()));

    const handleGetEmployee = (restaurant_id,employee_id) => {
        return navigateTo(`/admin/restaurants/${restaurant_id}/employees/update/${employee_id}`);
    };

    useEffect(() => {
        if (restaurant_id) {
            getEmployees(restaurant_id);
        }
    }, [restaurant_id, getEmployees]);

    if (employee_id) return <Outlet />;
    
    return (
        <div className="overflow-x-auto mx-1">
            <h1 className="text-2xl my-5 text-center">Administrar mis Empleados</h1>
            {isLoading ? 
                <div className='mt-10'><SpinerComponent/></div>:
            results ? 
                results.length > 0 ? 
                    <div className="max-w-full text-end overflow-hidden">
                        <SearchComponent value={search} onChange={searcher} />
                        <div className='flex justify-end'>
                            <Link to={`/admin/restaurants/${restaurant_id}/employees/create`} className='mt-2 py-2 px-4 bg-color-primary text-white rounded mr-2'>+ Nuevo</Link>
                        </div>
                        <div className='overflow-x-auto '>
                            <table style={{ width:"900px" }}  className="min-w-full mt-4 bg-white border text-center">
                                <thead>
                                    <tr className='bg-green-200 '>
                                        <th className="px-4 py-2 border border-white text-gray-600">#</th>
                                        <th className="px-4 py-2 border border-white text-gray-600">Logo</th>
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
                                        <tr onClick={() => handleGetEmployee(restaurant_id, employee.id)} key={index} className="hover:bg-gray-200 text-center cursor-pointer">
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">
                                                <div className='flex justify-center items-center'>
                                                    {employee.user.picture !== null && employee.user.picture.trim() !== '' ? 
                                                    <img className="w-10 h-10 object-cover rounded-full ring-gray-300 dark:ring-gray-500" src={employee.user.picture} alt="Medium avatar"/>
                                                     : 
                                                        <div style={{ width:"50px", height:"50px" }} className='border-4 rounded-full flex justify-center items-center bg-color-primary'>
                                                        <p className='text-2xl text-white'>{employee.user.name.charAt()}</p>
                                                    </div>
                                                    }
                                                </div>
                                            </td>
                                            <td className="border px-4 py-2">{employee.user.name}</td>
                                            <td className="border px-4 py-2">{employee.role.name}</td>
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
                    : <div className='text-center'>
                        <EmployeeDoc linkButton="/admin/restaurants/${restaurant_id}/employees/create"  title="Registra un Empleado"/>
                    </div> : null}
            </div>
        );
    }
    