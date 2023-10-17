import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonPrimary } from '../../components/specific/ComponentsForm';

export default function RegisterOptions() {
  return (
    <div className='m-2 md:w-1/2 md:mx-auto md:mt-3'>
      <Link to="/auth/register/restaurant">
        <ButtonPrimary type="button" text="Restaurante" className="md:w-32 w-full" />
      </Link>
      <Link to="/auth/register/personal-data">
        <ButtonPrimary type="button" text="Cuenta personal" className="md:w-32 w-full" />
      </Link>
    </div>
  );
}
