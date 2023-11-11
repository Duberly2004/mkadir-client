import React from 'react';
import CardDoc from '../../components/cards/CardDoc';
import { Link } from 'react-router-dom';

export default function EmployeeDoc(props) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-center'>{props.title}</p>
      <CardDoc cardTitle="Agregar Empleado" cardIcon="01" cardText="Puedes agregar nuevos empleados a tu restaurante." />
      <CardDoc cardTitle="Editar Empleado" cardIcon="02" cardText="Edita la información de tus empleados existentes." />
      <svg className="mt-5 animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
      </svg>
      <Link to={props.linkButton} className='mt-3 py-2 px-4 bg-color-primary text-white animate-pulse hover:animate-none rounded'>Registrar</Link>
    </div>
  );
}
