import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import { getMenusRequest,getMenuIsPublishedRequest } from '../../api/Restaurant.pi';
import { getEmployeeRequest } from '../../api/Employeeapi';

export default function GetRestaurantPage() {
  const { restaurant_id } = useParams();
  const { user,getRestaurant,restaurantData} = useAuth()
  const [isLoading, setIsLoading] = useState(true);
  const [employeeCount, setEmployeeCount] = useState(0); 
  const [menuCount, setMenuCount] = useState(0); 
  const [isMenuPublished, setIsMenuPublished] = useState(false); 

  const getRestaurantData = async () => {
    try {
      const res = await getRestaurant(restaurant_id);
      if(res.data){
          setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRestaurantData();
    getEmployeeRequest(restaurant_id)
      .then((response) => {
        const employees = response.data;
        setEmployeeCount(employees.length);
        console.log(employees.length);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });

    getMenusRequest(restaurant_id)
      .then((response) => {
        const menus = response.data;
        setMenuCount(menus.length);
      })
      .catch((error) => {
        console.error('Error fetching menus:', error);
      });
      getMenuIsPublishedRequest(restaurant_id)
      .then((response) => {
        const isPublished = response.data; 
        setIsMenuPublished(isPublished);
      })
      .catch((error) => {
        console.error('Error fetching menu publication status:', error);
      });
  }, [restaurant_id]);

  if (isLoading) return <h1>Loading</h1>;
  return (
    <div className="w-full mx-auto h-full shadow-lg rounded-lg overflow-hidden">
        <h1 className='text-2xl my-5 text-center'>Perfil del restaurante</h1>
        <div className="bg-gray-300 h-40"></div>
        <img src={restaurantData.logo_url} alt="Profile Picture" className="w-32 h-32 sm:w-32 sm:h-32 rounded-full border-4 border-white -mt-12 sm:-mt-16 mx-auto"/>
        <div className="py-4 px-6 text-center">
            <p className="text-lg font-semibold mb-2">{restaurantData.name}</p>
            <div className='flex items-center justify-center'>
                  <div className={`w-3 h-3 rounded-full mr-2 ${restaurantData.is_open ? 'bg-green-500' : 'bg-red-500'}`} />
                  <p className='text-lg font-normal color-text-primary'>{restaurantData.is_open? 'Abierto' : 'Cerrado'}</p>
              </div>
            <p> {restaurantData.address}</p>

            <p className='text-start text-xl font-semibold mt-2'>Detalles <span className='text-sm font-normal'>(Solo tu puedes ver esto)</span></p>
            <p className='text-start mt-1'><span className='font-semibold'>Propietario:</span> {user.paternal_surname}  {user.maternal_surname} {user.name}</p>
            <p className='text-start'><span className='font-semibold'>Total de empleados: </span>{employeeCount}</p>
            <p className='text-start'><span className='font-semibold'>Total de menus: </span>{menuCount}</p>
            <p className='text-start'><span className='font-semibold'>Menú publicado: </span> {isMenuPublished ? 'Sí' : 'No'}</p>
        </div>
  </div>
  );
}
