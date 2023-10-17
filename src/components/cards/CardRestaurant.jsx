import React from 'react';
import { Link } from 'react-router-dom';

export default function CardRestaurant(props) {
  return (
    <Link
      to={props.LinkTo}
      className="flex items-center border py-2 my-2 hover:shadow-xl shadow-lg rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-200 cursor-pointer"
    >
      <div className="border overflow-hidden rounded-full w-16 h-16 flex justify-center items-center">
        <img
          src={props.card_img}
          alt={`Imagen de ${props.title}`}
          className="w-16 h-16 object-cover rounded-full"
        />
      </div>
      <div className="ml-4 w-full flex justify-between mr-3">
        <div>
          <p className="text-lg font-bold text-gray-600">{props.card_title}</p>
        </div>

        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${
              props.is_open ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <p>{props.is_open ? 'Abierto' : 'Cerrado'}</p>
        </div>
      </div>
    </Link>
  );
}
