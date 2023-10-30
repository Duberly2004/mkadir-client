import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import homeroCheff from '../imgs/homero_cheff.svg';
import uploadMenu from '../imgs/upload_menu.svg';

export default function CarrouselComponent() {
  const { user } = useAuth();

  return (
    <Carousel infiniteLoop showThumbs={false} >
     <div className='bg-color-primary rounded-md'>
        <div className={`flex items-${!user?"end":"center"} justify-center pl-2 pt-2`}>
            <div>
                <p className='mb-5 text-white text-lg'>{!user?"¡Explora con tu cuenta hoy!":"¡Publica tu menú para que todos puedan verlo!"}</p>
                <Link className='bg-gray-300 p-3 mb-2 text-center rounded block	' to="/auth/register">¡{!user?"Iniciar sesion":"Publicar Menú"}!</Link>
            </div>
            <img style={{ maxHeight:"200px" }} src={!user?homeroCheff:uploadMenu} alt="Imagen homero cheff" />
        </div>
    </div>
        <div className='bg-color-primary rounded-md'>
        <div className={`flex items-${!user?"end":"center"} justify-center pl-2 pt-2`}>
            <div>
                <p className='mb-5 text-white text-lg'>{!user?"¡Explora con tu cuenta hoy!":"¡Publica tu menú para que todos puedan verlo!"}</p>
                <Link className='bg-gray-300 p-3 mb-2 text-center rounded block	' to="/auth/login">¡{!user?"Iniciar sesion":"Registrar otro usuario"}!</Link>
            </div>
            <img style={{ maxHeight:"200px" }} src={!user?homeroCheff:uploadMenu} alt="Imagen homero cheff" />
        </div>
      </div>
    </Carousel>
  );
}
