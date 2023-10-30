import activeRestaurant from '../imgs/icons-active/active_restaurant.svg'
import activeUser from '../imgs/icons-active/active_user.svg'
import employees from '../imgs/icons/employees.svg'
import food from '../imgs/icons/food.svg'
import schedule from '../imgs/icons/schedule.svg'
import CardAdmin from '../components/cards/CardAdmin'

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Admin</h1>

      <div className="grid grid-cols-2 gap-4">
        <CardAdmin 
        car_img={activeUser}
        card_title = "Mi cuenta"
        />
        <CardAdmin 
        car_img={activeRestaurant}
        card_title = "Mis restaurantes"
        to_url="restaurants"
        />
        <CardAdmin 
        car_img={food}
        card_title = "Mis platos"
        />
        <CardAdmin 
        car_img={schedule}
        card_title = "Horario de trabajo"
        />
        <CardAdmin 
        car_img={employees}
        card_title = "Empleados"
        to_url="employees"

        />
      </div>
    </div>
  );
}
