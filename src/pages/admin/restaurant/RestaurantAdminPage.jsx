import React, { useState, useEffect } from 'react';
import SearchComponent from '../../../components/SearchComponent';
import { Link, Outlet, useNavigate,useParams } from 'react-router-dom';
import { useRestaurantContext } from '../../../context/RestaurantContext';
import SpinerComponent from '../../../components/SpinerComponent';
import RestaurantDoc from '../../../components/documentation/RestaurantDoc'

//icon employee
import employees from '../../../imgs/icons/employees.svg'

export default function RestaurantAdminPage() {
    const { restaurants,getRestaurants ,isLoading} = useRestaurantContext()
    const [search, setSearch] = useState('');
    const navigateTo = useNavigate()
    const { restaurant_id } = useParams()

    const searcher = (e) => {
        setSearch(e.target.value);
    };
        // FILTER DATA
    const results = !search ? restaurants : restaurants.filter((dato)=>dato.name.toLowerCase().includes(search.toLowerCase()))

    const handleGetRestaurant=(restaurant_id)=>{
        return navigateTo(`/admin/restaurants/update/${restaurant_id}`)
    }

    useEffect(() => {
        getRestaurants()
    }, []);

    if (restaurant_id) return <Outlet/>
    return (
        <div className="overflow-x-auto mx-1">
            <h1 className="text-2xl my-5 text-center">Administrar mis Restaurantes</h1>
            {isLoading? <div className='mt-10'><SpinerComponent/></div>: 
            results?
            results.length > 0 ? 
            <div className="max-w-full text-end overflow-hidden">
                <SearchComponent value={search} onChange={searcher} />
                    <div className='flex justify-end'>
                        <Link to="/admin/restaurants/create" className='mt-2 py-2 px-4 bg-color-primary text-white rounded mr-2'>+ Nuevo</Link>
                    </div>
                <div className='overflow-x-auto '>    
                    <table style={{ width:"900px" }}  className="min-w-full mt-4 bg-white border text-center">
                        <thead>
                            <tr className='bg-green-200 '>
                                <th className="px-4 py-2 border border-white text-gray-600">#</th>
                                <th className="px-4 py-2 border border-white text-gray-600">Logo</th>
                                <th className="px-4 py-2 border border-white text-gray-600">Nombre</th>
                                <th className="px-4 py-2 border border-white text-gray-600">Estado</th>
                                <th className="px-4 py-2 border border-white text-gray-600">Ubicación</th>
                                <th className="px-4 py-2 border border-white text-gray-600">Empleados</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {results.map((restaurant, index) => (
                                <tr onClick={()=>handleGetRestaurant(restaurant.id)} key={index} className="hover:bg-gray-200 text-center cursor-pointer">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                        <div className='flex justify-center items-center'>
                                        {restaurant.logo_url !== null && restaurant.logo_url.trim() === ''?
                                            <div style={{ width:"50px",height:"50px"  }} className='border-4 rounded-full flex justify-center items-center bg-color-primary'>
                                                <p className='text-2xl text-white'>{restaurant.name.charAt()}</p>
                                            </div>      
                                            :
                                            <img className="w-10 h-10 object-cover rounded-full ring-gray-300 dark:ring-gray-500"  src={restaurant.logo_url} alt="Medium avatar"/>
                                        }
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">{restaurant.name}</td>
                                    <td className="border px-4 py-2">{restaurant.is_open ? "Abierto" : "Cerrado"}</td>
                                    <td className="border px-4 py-2">{restaurant.address}</td>
                                    <td className="border px-4 py-2 flex justify-center items-center" > <Link to={`/admin/restaurants/${restaurant.id}/employees`} onClick={(e) => e.stopPropagation()}><img src={employees}/></Link></td>
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

