import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchComponent from '../../components/SearchComponent';
import {getResturantsRequest} from '../../api/Restaurant.pi';
import {getEmployeesRequest} from '../../api/Employeeapi';
import CardRestaurantAdmin from '../../components/cards/CardRestaurantAdmin';

export default function GetRestaurantsPage() {
  const { restaurant_id } = useParams();
  const { user, restaurantData } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const getRestaurantData = async () => {
    try {
      const response = await getResturantsRequest();
      if (response.data) {
        setIsLoading(false);
        setRestaurants(response.data);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      setIsLoading(false);
    }
      try {
        const employeesResponse = await getEmployeesRequest(restaurant_id);
        console.log(employeesResponse)
        if (employeesResponse.data) { // Verifica si los datos de empleados existen
          const employees = employeesResponse.data;
          console.log(employeesResponse)
          setTotalEmployees(employees.length);
          console.log(restaurants);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    getRestaurantData();
    console.log(totalEmployees)
  }, [restaurant_id]);

  if (isLoading) return <h1>Loading</h1>;

  const results = !search ? restaurants : restaurants.filter((dato) =>
    dato.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='m-2 mt-4'>
      <h1 className='text-3xl my-5 text-center'>Mis Restaurantes</h1>
      <SearchComponent value={search} onChange={searcher} />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
        {results.map((restaurant, index) => (
          <CardRestaurantAdmin
            card_id={restaurant.id}
            key={index}
            card_img={restaurant.logo_url}
            card_title={restaurant.name}
            LinkTo={totalEmployees}
            is_open={restaurant.is_open}
            address={restaurant.address}
          />
        ))}
        
      </div>
    </div>
  );
}
