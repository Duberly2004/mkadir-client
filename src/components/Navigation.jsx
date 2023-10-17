import React from "react";
import { useLocation } from 'react-router-dom';
import inactive_home from '../imgs/icons-inactive/inactive_home.svg';
import inactive_employees from '../imgs/icons-inactive/inactive_employees.svg';
import inactive_timetable from '../imgs/icons-inactive/inactive_timetable.svg';
import inactive_menu from '../imgs/icons-inactive/inactive_menu.svg';
import inactive_restaurant from '../imgs/icons-inactive/inactive_restaurant.svg';
import inactive_user from '../imgs/icons-inactive/inactive_user.svg';
import inactive_menu_admin from '../imgs/icons-inactive/inactive_menu_admin.svg';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchComponent from '../components/SearchComponent'; // Importa el componente SearchComponent

export default function Navigation() {
  let location = useLocation();
  const { user, isLoading, restaurantData } = useAuth();
  const regex = /^\/restaurants\/\d+.*$/;
  const urlIsCorrect = regex.test(location.pathname);

  return (
    <nav className={`bg-white border py-2 fixed top-0 w-full z-10`}>
      <div className={`flex flex-row items-center justify-center gap-4 text-center ${urlIsCorrect ? 'justify-center' : 'justify-around'}`}>
        <Link to='/' className="col link-item"><img src={inactive_home} alt="Home Icon" /></Link>
        <SearchComponent /> {/* Agrega el componente SearchComponent aquí */}
        <Link className='bg-gray-300 p-3 mb-2 h-11 text-center rounded block	' to="/auth/login">¡{!user?"Iniciar sesion":"Publicar Menú"}!</Link>
        {isLoading ? <h1>Loading</h1> : user && (
          <>
            {urlIsCorrect && (
              <>
                <Link to={`/restaurants/${restaurantData ? restaurantData.id : null}/work-schedule`} className="col link-item"><img src={inactive_timetable} alt="Timetable Icon" /></Link>
                <Link to='/restaurants/menu' className="col link-item"><img src={inactive_menu} alt="Menu Icon" /></Link>
                <Link to={`/restaurants/${restaurantData ? restaurantData.id : null}/employees`} className="col link-item"><img src={inactive_employees} alt="Employees Icon" /></Link>
              </>
            )}
            <Link to='/restaurants' className="col link-item"><img src={inactive_restaurant} alt="Restaurants Icon" /></Link>
            <Link to='/profile' className="col link-item"><img src={inactive_user} alt="Profile Icon" /></Link>
            <Link to='/admin' className="col link-item"><img src={inactive_menu_admin} alt="Admin Icon" /></Link>
          </>
        )}
      </div>
    </nav>
  );
}
