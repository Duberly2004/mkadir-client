import { useAuth } from '../context/AuthContext';
import homeroCheff from '../imgs/homero_cheff.svg'
import uploadMenu from '../imgs/upload_menu.svg'
export default function CarrouselComponent() {
  const {user} = useAuth()
  return (
    <div className='bg-color-primary rounded-md h-full'>
        <div className={`flex items-${!user?"end":"center"} justify-center pl-2 pt-2`}>
            <div>
                <p className='mb-5 text-white text-lg'>{!user?"¡Explora con tu cuenta hoy!":"¡Publica tu menú para que todos puedan verlo!"}</p>
            </div>
            <img style={{ maxHeight:"200px" }} src={!user?homeroCheff:uploadMenu} alt="Imagen homero cheff" />
        </div>
    </div>
  );
}
