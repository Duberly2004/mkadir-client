import React from 'react';
import { Link } from 'react-router-dom';

export default function CardEmployees(props) {
  return (
    <Link to={`${props.employee_id}`}>
      <div className="flex mt-6 mb-4 rounded cursor-pointer bg-white shadow-xl relative p-3">
        <div className="h-full flex">
          <img style={{ height: "80px", width: "80px" }} className="object-cover rounded-full ring-gray-300 dark:ring-gray-500" src={props.card_img} alt="Profile Picture" />
          <div className="text-sm ml-2">
            <p className="text-lg font-semibold mb-3">{props.card_user}</p>
            <p className="text-lg font-semibold mb-2 color-text-primary m-2">{props.card_role}</p>
            <button className="bg-blue-600 text-sm hover:bg-blue-700 text-white py-1 px-5 rounded-md m-2">Editar</button>
            <button className="bg-yellow-500 text-sm hover:bg-yellow-600 text-white py-1 px-5 rounded-md m-2">Quitar</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
