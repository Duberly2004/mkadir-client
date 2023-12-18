import activeRestaurant from '../imgs/icons-active/active_restaurant.svg'
import activeUser from '../imgs/icons-active/active_user.svg'
import employees from '../imgs/icons/employees.svg'
import food from '../imgs/icons/food.svg'
import schedule from '../imgs/icons/schedule.svg'
import CardAdmin from '../components/cards/CardAdmin'
// Icons
import {FaStore} from 'react-icons/fa'
import {FcComboChart,FcManager} from 'react-icons/fc'
import ButtonDarkMode from '../components/specific/ButtonDarkMode'
// FcCalendar
// FcConferenceCall
export default function AdminPage() {
  return (
    <div className='sm:mt-0 mt-8'>
      <div className='justify-end flex md:hidden'>
        <ButtonDarkMode/>
      </div>
      <h1 className="dark:text-white text-2xl font-bold text-center flex justify-center items-center gap-1"><FcComboChart/>Admin</h1>
      <div className="grid grid-cols-2 gap-4">
        {/*<CardAdmin 
        card_icon={FcManager}
        card_title = "Mi cuenta"
        card_url="profile/"
        />*/}
        <CardAdmin 
        card_title = "Mis restaurantes"
        card_icon={FaStore}
        card_url="restaurants/"
        />
        {/* <CardAdmin 
        card_img={activeRestaurant}
        card_title = "Mis restaurantes"
        card_url="restaurants/"
        /> */}
        {/* <CardAdmin 
        card_img={food}
        card_title = "Mis platos"
        />
        <CardAdmin 
        card_img={schedule}
        card_title = "Horario de trabajo"
        />
        <CardAdmin 
        card_img={employees}
        card_title = "Empleados"
        /> */}
      </div>
    </div>
  );
}
