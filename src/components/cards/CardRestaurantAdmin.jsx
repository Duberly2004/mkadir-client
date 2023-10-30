import React from 'react';
import { Link } from 'react-router-dom';

export default function CardRestaurantAdmin(props) {
  return (
    <Link to={`/restaurants/${props.card_id}`} className="flex items-end mt-6 mb-4 rounded cursor-pointer bg-white shadow-xl relative p-3">
        <div className="w-16 h-16 flex-shrink-0 mb-2">
            <img style={{ height: "100%", width: "100%" }} className="object-cover rounded-full ring-gray-300 dark:ring-gray-500" src={props.card_img} alt={`logo ${props.card_title}`} />
        </div>
        <div className="text-sm ml-2">
            <p className="leading-none text-md text-base font-semibold my-1">{props.card_title}</p>
            <p className="">Dirección: {props.address}</p>
            <p className="color-text-primary font-semibold">Total Empleados: {props.totalEmployees}</p>
            <div className="mt-2 flex items-center ">
                <p className="color-text-primary font-semibold">Menu publicado: {props.is_open}</p>
            </div>
        </div>
   
        <button className="bg-blue-600 text-sm hover-bg-blue-700 text-white py-1 px-5 rounded-md ">Cerrar</button>

    </Link>
  );
}
