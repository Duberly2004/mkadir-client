import React,{useEffect, useState} from 'react'
import CarrouselComponent from '../components/CarrouselComponent'
import CardRestaurant from '../components/cards/CardRestaurant'
import { getAllResturantsRequest } from '../api/Restaurant.pi'

export default function HomePage() {
  const [restaurants,setRestaurants] = useState([])
  const [search,setSearch] = useState('')
  const showData = async()=>{
    const res = await getAllResturantsRequest()
    setRestaurants(res.data)
  }
  const searcher = (e) => {
    setSearch(e.target.value)
  }
  // FILTER DATA
  const results = !search ? restaurants : restaurants.filter((dato)=>dato.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(()=>{
    showData()
  },[])

  return (
    <div className='m-2 mt-4'>
      <h1 className='text-3xl my-5 text-center'>Restaurantes</h1>
      <CarrouselComponent />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {results.map((restaurant, index) => (
          <div key={index} className="p-4">
            <CardRestaurant
              card_img={restaurant.logo_url}
              card_title={restaurant.name}
              LinkTo={`/restaurants/${restaurant.id}/details/menu`}
              is_open={restaurant.is_open}
            />
          </div>
        ))}
      </div>
    </div>
  );
}